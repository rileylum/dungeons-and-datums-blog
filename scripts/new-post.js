#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as p from '@clack/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

async function getExistingCategoriesAndTags() {
  const files = fs.readdirSync(BLOG_DIR);
  const categories = new Set();
  const tags = new Set();

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];

      // Extract category
      const categoryMatch = frontmatter.match(/category:\s*['"]([^'"]+)['"]/);
      if (categoryMatch) categories.add(categoryMatch[1]);

      // Extract tags
      const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
      if (tagsMatch) {
        const tagsList = tagsMatch[1].match(/['"]([^'"]+)['"]/g);
        if (tagsList) {
          tagsList.forEach(tag => tags.add(tag.replace(/['"]/g, '')));
        }
      }
    }
  }

  return {
    categories: Array.from(categories).sort(),
    tags: Array.from(tags).sort(),
  };
}

async function main() {
  console.clear();

  p.intro('✨ Create a new blog post');

  const { categories, tags: existingTags } = await getExistingCategoriesAndTags();

  const title = await p.text({
    message: 'What is the title of your post?',
    placeholder: 'The Mathematics Behind Advantage and Disadvantage',
    validate: (value) => {
      if (!value) return 'Title is required';
    },
  });

  if (p.isCancel(title)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const slug = slugify(title);
  const filename = `${slug}.md`;
  const filepath = path.join(BLOG_DIR, filename);

  if (fs.existsSync(filepath)) {
    p.cancel(`A post with slug "${slug}" already exists!`);
    process.exit(1);
  }

  const description = await p.text({
    message: 'Write a short description (optional):',
    placeholder: 'A deep dive into the statistical implications of this game mechanic.',
  });

  if (p.isCancel(description)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const preview = await p.text({
    message: 'Write a preview excerpt (optional):',
    placeholder: 'A longer preview that will appear on the home page and category pages...',
  });

  if (p.isCancel(preview)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const category = await p.select({
    message: 'Select a category:',
    options: [
      ...categories.map(cat => ({ value: cat, label: cat })),
      { value: '__custom__', label: '+ Add new category' },
    ],
  });

  if (p.isCancel(category)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  let finalCategory = category;
  if (category === '__custom__') {
    const customCategory = await p.text({
      message: 'Enter new category name:',
      validate: (value) => {
        if (!value) return 'Category is required';
      },
    });

    if (p.isCancel(customCategory)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    finalCategory = customCategory;
  }

  const tags = await p.multiselect({
    message: 'Select tags (space to select, enter to confirm):',
    options: existingTags.map(tag => ({ value: tag, label: tag })),
    required: false,
  });

  if (p.isCancel(tags)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const customTags = await p.text({
    message: 'Add custom tags (comma-separated, or press enter to skip):',
    placeholder: 'probability, dice-mechanics, combat',
  });

  if (p.isCancel(customTags)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  let allTags = [...tags];
  if (customTags) {
    const customTagsList = customTags.split(',').map(t => t.trim()).filter(Boolean);
    allTags = [...allTags, ...customTagsList];
  }

  if (allTags.length === 0) {
    p.cancel('At least one tag is required!');
    process.exit(1);
  }

  const draft = await p.confirm({
    message: 'Should this post be a draft?',
    initialValue: true,
  });

  if (p.isCancel(draft)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const addHeroImage = await p.confirm({
    message: 'Add a hero image?',
    initialValue: false,
  });

  if (p.isCancel(addHeroImage)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  let heroImage = '';
  let heroImageAlt = '';

  if (addHeroImage) {
    heroImage = await p.text({
      message: 'Hero image path (relative to public/):',
      placeholder: 'images/hero-image.jpg',
      validate: (value) => {
        if (!value) return 'Image path is required';
      },
    });

    if (p.isCancel(heroImage)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    heroImageAlt = await p.text({
      message: 'Hero image alt text:',
      placeholder: 'A visualization of advantage and disadvantage probability',
    });

    if (p.isCancel(heroImageAlt)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  const s = p.spinner();
  s.start('Creating blog post...');

  const today = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: '${title}'
description: '${description}'${preview ? `\npreview: >\n  ${preview}` : ''}
pubDate: ${today}
category: '${finalCategory}'
tags: [${allTags.map(tag => `'${tag}'`).join(', ')}]
draft: ${draft}${heroImage ? `\nheroImage: '${heroImage}'` : ''}${heroImageAlt ? `\nheroImageAlt: '${heroImageAlt}'` : ''}
---

# ${title}

Write your blog post content here...
`;

  try {
    fs.writeFileSync(filepath, frontmatter);
    s.stop('Blog post created successfully!');

    p.note(`${filepath}`, 'Post created at:');

    p.outro(`Run ${p.inverse(' npm run dev ')} to preview your post!`);
  } catch (error) {
    s.stop('Failed to create blog post');
    p.cancel(`Error: ${error.message}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
