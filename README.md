# Dungeons and Datums

A blog about Old School Renaissance (OSR), NSR games, and Old School D&D in Adelaide, Australia - featuring resources, tools, and campaign journals, built with Astro, Tailwind CSS, and DaisyUI.

## Features

- ✅ **Markdown Blog Posts** - Write content in markdown with frontmatter
- ✅ **Content Collections** - Type-safe content management with Astro
- ✅ **Pagination** - Browse posts with 10 per page
- ✅ **Categories & Tags** - Organize posts with categories and tags
- ✅ **Draft Support** - Mark posts as drafts to hide them
- ✅ **Reading Time** - Automatic reading time estimation
- ✅ **Related Posts** - Suggest similar posts based on tags/category
- ✅ **Search** - Client-side fuzzy search with Fuse.js
- ✅ **RSS Feed** - Auto-generated RSS feed at `/rss.xml`
- ✅ **SEO Optimized** - Open Graph tags, meta descriptions, canonical URLs
- ✅ **Responsive Design** - Mobile-friendly with Tailwind + DaisyUI

## Tech Stack

- **Astro 5.14.4** - Static site generator
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **DaisyUI 5.3.0** - Tailwind component library
- **TypeScript** - Type safety
- **Fuse.js** - Fuzzy search
- **@astrojs/rss** - RSS feed generation
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Development

```bash
# Install dependencies
npm install

# Start dev server (usually at http://localhost:4321)
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

## Creating Blog Posts

### 1. Create a New Markdown File

Create a new `.md` file in `src/content/blog/`:

```bash
src/content/blog/my-new-post.md
```

### 2. Add Frontmatter

All blog posts require frontmatter with the following fields:

```markdown
---
title: 'Your Post Title'
description: 'A brief description of your post'
pubDate: 2025-10-24
category: 'Category Name'
tags: ['tag1', 'tag2', 'tag3']
draft: false
heroImage: '/path/to/image.jpg' # Optional
heroImageAlt: 'Image description' # Optional
updatedDate: 2025-10-25 # Optional
---

# Your content here

Write your blog post content using markdown...
```

### 3. Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | Yes | Short description for SEO and preview |
| `pubDate` | date | Yes | Publication date (YYYY-MM-DD) |
| `category` | string | Yes | Single category for the post |
| `tags` | array | Yes | Array of tags |
| `draft` | boolean | Yes | Set to `true` to hide from site |
| `heroImage` | string | No | Path to hero image |
| `heroImageAlt` | string | No | Alt text for hero image |
| `updatedDate` | date | No | Last update date |

### 4. Writing Content

Use standard markdown syntax for your content:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](https://example.com)

![Image alt](./image.jpg)

> Blockquote

`inline code`

\`\`\`javascript
// Code block
const example = 'code';
\`\`\`
```

## Project Structure

```
dungeons-and-datums/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # Static assets
│   ├── components/
│   │   ├── blog/        # Blog-specific components
│   │   │   ├── BlogCard.astro
│   │   │   ├── Pagination.astro
│   │   │   ├── RelatedPosts.astro
│   │   │   ├── ReadingTime.astro
│   │   │   ├── TagList.astro
│   │   │   └── SearchBar.astro
│   │   └── Navigation.astro
│   ├── content/
│   │   ├── blog/        # Your blog posts (markdown)
│   │   └── config.ts    # Content collection schema
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [...slug].astro     # Individual blog posts
│   │   │   ├── category/
│   │   │   │   └── [category].astro
│   │   │   └── tag/
│   │   │       └── [tag].astro
│   │   ├── page/
│   │   │   └── [page].astro        # Pagination pages
│   │   ├── index.astro              # Home page
│   │   └── rss.xml.ts               # RSS feed
│   └── utils/
│       ├── blog.ts      # Blog utility functions
│       └── search.ts    # Search functionality
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Routes

- `/` - Home page with latest posts (paginated)
- `/page/[n]` - Additional pagination pages
- `/blog/[slug]` - Individual blog post
- `/blog/category/[category]` - Posts by category
- `/blog/tag/[tag]` - Posts by tag
- `/rss.xml` - RSS feed

## Customization

### Update Site Information

Edit `astro.config.mjs` to update your site URL:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

### Change Theme

The site uses DaisyUI themes. Update the `data-theme` attribute in `src/layouts/BaseLayout.astro`:

```html
<html lang="en" data-theme="dark"> <!-- or "light", "cupcake", etc. -->
```

### Adjust Pagination

Change posts per page in `src/pages/index.astro` and `src/pages/page/[page].astro`:

```javascript
const postsPerPage = 10; // Change this number
```

## Deployment

This is a static site that can be deployed to any static hosting service:

- **Netlify**: Connect your Git repository
- **Vercel**: Import your Git repository
- **GitHub Pages**: Use the Astro GitHub Pages action
- **Cloudflare Pages**: Connect your repository

Build command: `npm run build`
Output directory: `dist`

## Adding More Features

### Comments

Consider adding comments with:
- [Giscus](https://giscus.app/) (GitHub Discussions)
- [Utterances](https://utteranc.es/) (GitHub Issues)
- [Disqus](https://disqus.com/)

### Analytics

Add analytics with:
- [Google Analytics](https://analytics.google.com/)
- [Plausible](https://plausible.io/)
- [Fathom](https://usefathom.com/)

### Newsletter

Integrate a newsletter with:
- [Mailchimp](https://mailchimp.com/)
- [ConvertKit](https://convertkit.com/)
- [Buttondown](https://buttondown.email/)

## License

All rights reserved.
