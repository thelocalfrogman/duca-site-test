# CLAUDE.md - AI Assistant Guide for DUCA Website

This document provides essential context for AI assistants working with the DUCA (Deakin University Cybersecurity Association) website codebase.

## Project Overview

**Purpose:** Official website for DUCA, a student-led cybersecurity community at Deakin University.

**Tech Stack:**
- **Framework:** Astro 5.x (static site generator)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.x + SCSS
- **Content:** Markdown/MDX for blog posts and projects
- **Deployment:** GitHub Pages via GitHub Actions

**Live Site:** https://duca-club.github.io/

## Quick Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start dev server at localhost:4321
npm run dev

# TypeScript type checking
npm run check

# Build for production (outputs to ./dist/)
npm run build

# Preview production build locally
npm run preview
```

## Directory Structure

```
src/
├── components/          # Astro components (.astro files)
├── layouts/             # Page layouts (DefaultLayout, MarkdownLayout)
├── pages/               # Route pages and dynamic routes
│   ├── blog/            # Blog listing and individual posts
│   │   └── _authors.json    # Author metadata
│   └── portfolio/       # Project listing and pages
│       └── _projectAuthors.json
├── content/             # Content collections
│   ├── blog/            # Blog posts (Markdown)
│   └── projects/        # Projects (MDX)
├── assets/
│   ├── scss/            # SCSS styles and mixins
│   └── img/             # Component images
├── styles/
│   └── tailwind.css     # Tailwind entry point
└── utils/               # Utility functions

public/                  # Static assets (images, fonts)
├── posts/               # Blog post images
├── projects/            # Project images
├── authors/             # Author profile images
└── fonts/               # Web fonts (Atkinson Hyperlegible)

docs/                    # Staff documentation
```

## Import Aliases

These path aliases are configured in `astro.config.mjs` and `tsconfig.json`:

```typescript
import Component from '@components/Component.astro'
import Layout from '@layouts/DefaultLayout.astro'
import asset from '@assets/img/image.png'
import { util } from '@/utils/util'
```

## Content Management

### Adding Blog Posts

1. Create folder: `src/content/blog/YYYY-MM-DD-slug-title/`
2. Create `index.md` with frontmatter:

```yaml
---
title: Post Title
author: author-key          # Must match key in _authors.json
description: Brief summary (20-30 words)
publishDate: YYYY-MM-DD
tags: ["Tag1", "Tag2"]
featuredImage: ./image.png  # Place image in same folder
slug: YYYY-MM-DD-slug-title # Must match folder name
---

Content in GitHub Flavored Markdown...
```

### Adding Authors

Edit `src/pages/blog/_authors.json`:

```json
{
    "author-key": {
        "name": "Display Name",
        "image": "/authors/author-key.png",
        "bio": "Short bio"
    }
}
```

Place author image in `/public/authors/`.

### Adding Projects

Create MDX file in `src/content/projects/` with frontmatter:

```yaml
---
title: Project Title
author: author-key
description: Project description
tags: ["Tag1", "Tag2"]
---
```

## Component Patterns

### Standard Component Structure

```astro
---
// Imports
import OtherComponent from '@components/OtherComponent.astro'

// Props interface
interface Props {
    title: string
    description?: string
}

const { title, description } = Astro.props
---

<section>
    <h1>{title}</h1>
    {description && <p>{description}</p>}
    <slot />
</section>

<style lang="scss" is:scoped>
    /* Scoped styles */
</style>
```

### Key Components

| Component | Purpose |
|-----------|---------|
| `Header.astro` | Site navigation with dark mode toggle |
| `Footer.astro` | Footer with links and info |
| `Hero.astro` | Homepage hero section |
| `Navigation.astro` | Accessible keyboard navigation |
| `PageHeader.astro` | Page title/subtitle header |
| `Feature.astro` | Feature card component |
| `SiteMeta.astro` | SEO metadata |

## Styling Guidelines

### CSS Custom Properties

Located in `src/assets/scss/base/_root.scss`:
- Colors use OKLCH color system with automatic palettes
- Primary: `#d648ff` (purple/magenta)
- Secondary: `#00d1b7` (teal)
- Typography uses 8-step scale (`--font-size--2` to `--font-size-8`)

### Dark Mode

- Uses `.darkmode` class on `<html>` element
- CSS `light-dark()` function for automatic color switching
- Respects `prefers-color-scheme` system preference

### Tailwind + SCSS

Both are available:
- Use Tailwind utilities in markup
- Use SCSS for complex component styles with `is:scoped`

## Accessibility Requirements

This project targets **WCAG 2.2 AA compliance**:

- **ESLint enforces** `jsx-a11y` strict rules
- Use semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`)
- Include proper ARIA attributes where needed
- Ensure keyboard navigability for all interactive elements
- Maintain color contrast ratios (use the built-in contrast checker)
- Support `prefers-reduced-motion` for animations
- Use Atkinson Hyperlegible font for readability

## Code Style

### Formatting (Prettier)

- 4-space indentation
- No semicolons
- Single quotes
- 120 character line width

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Hero.astro` |
| Pages/routes | kebab-case | `get-involved.astro` |
| CSS classes | kebab-case | `.featured-post` |
| Blog folders | `YYYY-MM-DD-slug` | `2024-12-19-title` |
| SCSS partials | Leading underscore | `_root.scss` |

### URL Slugs

```typescript
// Use src/utils/slugify.ts
slugify("Hello World") // → "hello-world"
```

## Build & Deploy

### Automatic Deployment

Pushing to `main` triggers GitHub Actions:
1. Installs dependencies with pnpm
2. Builds site with Astro
3. Deploys to GitHub Pages

### Pre-commit Checklist

Before committing:
1. Run `npm run check` for TypeScript errors
2. Run `npm run build` to ensure clean build
3. Test with `npm run dev` for visual verification

## Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro settings, integrations, aliases |
| `tsconfig.json` | TypeScript configuration |
| `eslint.config.js` | ESLint rules (accessibility-focused) |
| `.prettierrc` | Code formatting rules |
| `.nvmrc` | Node version (v20.5.1) |
| `src/content.config.ts` | Content collection schemas |

## Common Tasks

### Add a new page

Create `.astro` file in `src/pages/`. Use `DefaultLayout`:

```astro
---
import DefaultLayout from '@layouts/DefaultLayout.astro'
---

<DefaultLayout title="Page Title">
    <main>
        <!-- Content -->
    </main>
</DefaultLayout>
```

### Add navigation item

Edit `src/components/Navigation.astro` to add menu items.

### Modify site metadata

Edit `src/components/SiteMeta.astro` for global defaults, or pass props per-page.

### Update color scheme

Modify OKLCH values in `src/assets/scss/base/_root.scss`.

## Troubleshooting

### Build fails with type errors
Run `npm run check` to see TypeScript errors. Fix type issues before building.

### Images not loading
- Blog images: Place in same folder as `index.md`, reference with `./filename`
- Static images: Place in `public/` folder, reference with absolute path `/path/to/image`

### Slug mismatch errors
Ensure the `slug` frontmatter exactly matches the folder name in blog posts.

### ESLint accessibility errors
These are intentional strict rules. Fix accessibility issues rather than disabling rules.

## External Dependencies

- **accessible-astro-components**: Provides accessible UI components (DarkMode, SkipLinks, etc.)
- **astro-icon**: Icon system using Lucide icons
- **sharp**: Image optimization
- **astro-compress**: HTML/CSS/JS compression

## Notes for AI Assistants

1. **Always read files before editing** - Understand existing patterns first
2. **Preserve accessibility** - Never remove ARIA attributes or semantic HTML
3. **Match existing style** - Follow Prettier config and naming conventions
4. **Test changes** - Recommend running `npm run check` and `npm run dev`
5. **Keep commits focused** - One logical change per commit
6. **Document breaking changes** - Note any API changes in commit messages
7. **Avoid over-engineering** - Keep solutions simple and focused on the request
