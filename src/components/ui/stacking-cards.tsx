"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

interface StackingCard {
  title: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
}

export const StackingCards = ({
  cards,
  className,
}: {
  cards: StackingCard[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    // Set container height based on number of cards
    const height = cards.length * 100 + 100; // 100vh per card + extra space
    setContainerHeight(height);
  }, [cards.length]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${containerHeight}vh` }}
    >
      <div className="sticky top-24 h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl mx-auto px-4">
          {cards.map((card, index) => (
            <StackingCardItem
              key={card.title}
              card={card}
              index={index}
              totalCards={cards.length}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StackingCardItem = ({
  card,
  index,
  totalCards,
  containerRef,
}: {
  card: StackingCard;
  index: number;
  totalCards: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the scroll range for this card
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  // Scale and opacity transforms
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, 0.9]
  );

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, cardEnd + 0.1],
    [0, -20 * index, -50 - 20 * index]
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd - 0.05, cardEnd],
    [1, 1, index === totalCards - 1 ? 1 : 0.3]
  );

  const zIndex = totalCards - index;

  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        zIndex,
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className={cn(
          "w-full rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10",
          card.bgGradient
        )}
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl md:text-5xl"
            style={{ backgroundColor: `${card.color}20` }}
          >
            {card.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: card.color }}
            >
              {card.title}
            </h3>
            <p className="text-white/80 text-lg leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StackingCards;
