# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Agent Behavior Guidelines

- **Avoid confirmation bias** by questioning assumptions and seeking diverse perspectives
- **Do not assume prompts are correct** - review before responding
- **Expose errors immediately** when found in either responses or prompts
- **Ask for context** when more information is needed for full understanding and response
- **Avoid giving answers** when lacking sufficient information to provide good and correct responses

## Project Overview

This is an Astro-based personal website/blog with TypeScript, Tailwind CSS, and MDX support. The site features a minimalist design with a 3D cube on the homepage and a blog for technical content.

## Build Commands

### Development

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm start        # Alias for dev
```

### Build & Production

```bash
pnpm build        # Type check and build for production
pnpm preview      # Preview production build locally
```

### Code Quality

```bash
pnpm lint         # Run ESLint on all source files
pnpm lint:fix     # Auto-fix ESLint issues
pnpm prettier     # Check Prettier formatting
pnpm prettier:fix # Auto-fix formatting with Prettier
```

### Type Checking

```bash
pnpm astro check  # Run Astro's type checker
```

**Note**: This project does not have automated tests. Focus on linting, type checking, and manual verification.

## Code Style Guidelines

### File Structure & Naming

- Use PascalCase for Astro components (e.g., `Header.astro`, `BaseLayout.astro`)
- Use camelCase for TypeScript files (e.g., `config.ts`, `consts.ts`)
- Use kebab-case for file names in content collections
- Place components in `src/components/` with subdirectories by purpose (layout/, home/)

### Import Organization

```typescript
// 1. Astro/core imports
import { ViewTransitions } from 'astro:transitions';
import { Image } from 'astro:assets';

// 2. Local component imports
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/layout/Header.astro';

// 3. Third-party imports
import { defineCollection, z } from 'astro:content';
```

### TypeScript & Astro Patterns

- Use interface definitions for component props:

```typescript
export interface Props {
  title?: string;
  description?: string;
  image?: string;
}
```

- Destructure props at the top of the frontmatter:

```typescript
const { title, description, image } = Astro.props;
```

- Use TypeScript for content collection schemas with Zod validation

### Formatting Rules (Prettier)

- Print width: 100 characters
- Use tabs (not spaces) for indentation
- Single quotes for strings
- Semicolons required
- ES5 trailing commas
- Single quotes for strings

### ESLint Configuration

- Extends: Standard, TypeScript, Astro, Prettier
- Strict TypeScript rules enabled
- Astro-specific linting for .astro files
- Accessibility checks with jsx-a11y

### CSS & Styling

- Use Tailwind CSS classes for all styling
- Prefer utility classes over custom CSS
- Use responsive prefixes (`md:`, `lg:`) appropriately
- Custom CSS should be placed in `<style>` blocks within components when necessary
- Use semantic HTML elements

### Component Patterns

- Astro components should follow this structure:

```astro
---
// Imports
import Component from '../path/to/Component.astro';

// Props interface
export interface Props {
  // prop definitions
}

// Props destructuring
const { prop } = Astro.props;
---

<!-- HTML/template -->
<div class="tailwind-classes">
  <Component prop={prop} />
</div>

<!-- Optional styles -->
<style>
  /* Custom CSS if needed */
</style>

<!-- Optional scripts -->
<script>
  // Client-side JavaScript
</script>
```

### Content Collections

- Blog posts go in `src/content/blog/`
- Use Zod schemas for type-safe frontmatter
- Required fields: `title`, `description`, `pubDate`
- Optional fields: `updatedDate`, `heroImage`

### Error Handling

- Use TypeScript's strict mode for compile-time error prevention
- Validate content collections with Zod schemas
- Use proper error boundaries in client-side scripts

### Performance Guidelines

- Images should use Astro's `<Image>` component for optimization
- Leverage Astro's prefetching for navigation
- Use ViewTransitions for smooth page transitions
- Minimize client-side JavaScript

### Git Hooks

Pre-commit hooks run automatically:

1. `pnpm prettier` - Check formatting
2. `pnpm lint` - Run ESLint

These must pass before commits are allowed.

## Development Workflow

1. Make changes following the style guidelines
2. Run `pnpm prettier:fix` and `pnpm lint:fix` before committing
3. Use `pnpm dev` for local testing
4. Run `pnpm build` to verify production build
5. Check the preview with `pnpm preview` if needed

## Key Dependencies

- **Astro**: Static site generator
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety
- **MDX**: Enhanced Markdown support
- **Sharp**: Image optimization
- **ESLint + Prettier**: Code quality tools

## Site Configuration

- Site URL: `https://www.ajara.dev`
- Base language: English
- Typography: DM Sans Variable (sans), DM Mono (mono)
- Color scheme: Stone/Orange theme
- Markdown theme: Monokai (Shiki)
