# Dungeons and Datums

A blog about Old School Renaissance (OSR), NSR games, and Old School D&D in Adelaide, Australia - featuring resources, tools, and campaign journals, built with Astro, Tailwind CSS, and DaisyUI.

## Site URLs

- **Production**: https://dungeonsanddatums.com
- **Development**: http://localhost:4321
- **Tools**: https://tools.dungeons-and-datums.com

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
dungeons-and-datums/
├── src/
│   ├── content/
│   │   ├── blog/              # Blog post markdown files
│   │   └── config.ts          # Content collection schema
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [...slug].astro       # Individual blog posts
│   │   │   ├── category/[category].astro
│   │   │   └── tag/[tag].astro
│   │   ├── page/[page].astro         # Pagination
│   │   ├── index.astro               # Homepage
│   │   ├── tools.astro               # Tools page
│   │   └── rss.xml.ts                # RSS feed
│   ├── components/
│   │   ├── blog/              # Blog-specific components
│   │   └── Navigation.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main layout wrapper
│   ├── utils/
│   │   ├── blog.ts            # Blog helper functions
│   │   └── search.ts          # Search functionality
│   └── styles/
│       └── global.css         # Global styles and themes
├── scripts/
│   ├── new-post.js            # Interactive post creation
│   ├── generate-description.js   # AI description generator
│   ├── generate-preview.js       # AI preview generator
│   ├── generate-posts.js         # Dev: Generate example posts
│   └── cleanup-posts.js          # Dev: Remove example posts
├── public/                    # Static assets
└── astro.config.mjs          # Astro configuration
```

## Creating Blog Posts

### Interactive CLI (Recommended)

The easiest way to create a new blog post:

```bash
npm run new-post
```

This interactive tool will:
- Prompt for post title (auto-generates slug)
- Ask for description and preview
- Let you select or create categories
- Allow tag selection and custom tags
- Set draft status
- Optionally add hero image

The post will be created at `src/content/blog/{slug}.md`.

### Manual Creation

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'Short SEO-friendly description (1-2 sentences)'
preview: >
  Longer preview excerpt that appears on listing pages (1 paragraph)
pubDate: 2025-10-27
category: 'OSR'
tags: ['old-school', 'rules']
draft: false
heroImage: '/images/hero.jpg'  # Optional
heroImageAlt: 'Alt text'       # Optional
updatedDate: 2025-10-28        # Optional
---

# Your Post Title

Write your content here...
```

### AI Enhancement

Generate SEO descriptions and preview excerpts using Claude CLI:

```bash
# Generate description for a specific post
npm run generate-description my-post-slug

# Interactive mode - select from list
npm run generate-description

# Generate preview excerpt
npm run generate-preview my-post-slug

# Interactive mode
npm run generate-preview
```

**Requirements**: Claude Code CLI must be in your PATH.

## Content Schema Reference

### Required Fields

- **title** (string): Post title
- **description** (string): Short SEO meta description (1-2 sentences)
- **pubDate** (date): Publication date (YYYY-MM-DD)
- **category** (string): Single category
- **tags** (array): Array of tag strings (minimum 1 tag)
- **draft** (boolean): `true` to hide from site, `false` to publish

### Optional Fields

- **preview** (string): Longer excerpt for listing pages (1 paragraph)
- **heroImage** (string): Path to hero image (relative to `public/`)
- **heroImageAlt** (string): Alt text for hero image
- **updatedDate** (date): Last update date (YYYY-MM-DD)

### Field Distinction

- **description**: Short SEO meta description for `<meta>` tags and social sharing
- **preview**: Longer excerpt displayed on home page and category/tag listings

## Adding New Pages

Create a new `.astro` file in `src/pages/`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

// Your page logic here
---

<BaseLayout
  title="Page Title | Dungeons and Datums"
  description="Page description for SEO"
>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-5xl font-bold mb-6">Your Page Title</h1>
    <!-- Your content here -->
  </div>
</BaseLayout>
```

### Dynamic Routes

- `[param].astro` - Single dynamic segment (e.g., `/blog/my-post`)
- `[...slug].astro` - Catch-all route (e.g., `/blog/2024/10/my-post`)

Dynamic routes must export a `getStaticPaths()` function. See existing pages like `src/pages/blog/[...slug].astro` for examples.

## Development Workflow

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Development Utilities

```bash
# Generate example posts (default: 20)
npm run generate-posts 50

# Clean up all example posts
npm run cleanup-posts
```

## Deployment

1. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. **SSH to VPS**:
   ```bash
   ssh user@your-vps-ip
   ```

3. **Navigate to project directory**:
   ```bash
   cd /path/to/dungeons-and-datums
   ```

4. **Pull latest changes**:
   ```bash
   git pull
   ```

5. **Install dependencies** (if package.json changed):
   ```bash
   npm install
   ```

6. **Build site**:
   ```bash
   npm run build
   ```

The built site will be in the `dist/` directory.

## Utility Functions

### Blog Helpers (`src/utils/blog.ts`)

- `getAllPosts()` - Get all posts sorted by date
- `getPublishedPosts()` - Filter out drafts
- `getPostsByCategory(category)` - Filter by category
- `getPostsByTag(tag)` - Filter by tag
- `getRelatedPosts(post, limit)` - Get related posts by category and tags
- `calculateReadingTime(content)` - Estimate reading time (200 WPM)
- `paginatePosts(posts, page, perPage)` - Split posts into pages
- `getAllCategories()` - Get unique categories
- `getAllTags()` - Get unique tags

### Search (`src/utils/search.ts`)

Client-side fuzzy search using Fuse.js:
- `createSearchIndex(posts)` - Create searchable index
- `searchPosts(index, query)` - Search posts by title, description, tags, category, content

Search weights: Title (3x), Description (2x), Tags (1.5x), Category (1x), Content (0.5x)

## Tech Stack

- **Astro 5.14** - Static site generator
- **Tailwind CSS 4.1** - Utility-first CSS
- **DaisyUI 5.3** - Component library
- **TypeScript** - Type safety
- **Fuse.js** - Fuzzy search
- **@astrojs/rss** - RSS feed generation
- **@astrojs/sitemap** - Sitemap generation
- **ESLint + Prettier** - Code quality

## Configuration

- **Site URL**: Set in `astro.config.mjs` (https://dungeonsanddatums.com)
- **Posts per page**: 10 (configured in `src/pages/index.astro` and `src/pages/page/[page].astro`)
- **Themes**: Custom `topo-dark` and `topo-light` defined in `src/styles/global.css`
- **Reading time**: 200 words per minute (configured in `src/utils/blog.ts`)
