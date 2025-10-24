#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import * as p from '@clack/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

function checkClaudeCLI() {
  try {
    // Try to run claude --version to check if it's available
    const result = spawnSync('claude', ['--version'], { encoding: 'utf-8' });
    return result.status === 0 || result.status === null;
  } catch {
    return false;
  }
}

function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filepath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filepath, 'utf-8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

      let title = file.replace('.md', '');
      let draft = false;

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/title:\s*['"]([^'"]+)['"]/);
        const draftMatch = frontmatter.match(/draft:\s*(true|false)/);

        if (titleMatch) title = titleMatch[1];
        if (draftMatch) draft = draftMatch[1] === 'true';
      }

      return {
        filename: file,
        slug: file.replace('.md', ''),
        title,
        draft,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function extractContent(fileContent) {
  // Remove frontmatter, only send the actual content
  const match = fileContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)/);
  return match ? match[1].trim() : fileContent;
}

async function generateDescription(content) {
  const prompt = `Please write a concise, engaging 1-2 sentence description for this blog post. The description should be suitable for SEO and social media sharing. Only return the description text, nothing else.

Blog post content:
${content}`;

  try {
    const result = spawnSync('claude', {
      input: prompt,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    if (result.error) {
      throw new Error(`Failed to run claude: ${result.error.message}`);
    }

    if (result.status !== 0) {
      throw new Error(`Claude exited with code ${result.status}: ${result.stderr}`);
    }

    return result.stdout.trim();
  } catch (error) {
    throw new Error(`Failed to generate description: ${error.message}`);
  }
}

function updateDescription(filepath, newDescription) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const frontmatterMatch = content.match(/^(---\n)([\s\S]*?)(\n---\n)([\s\S]*)/);

  if (!frontmatterMatch) {
    throw new Error('Could not parse frontmatter');
  }

  const [, start, frontmatter, end, postContent] = frontmatterMatch;

  // Replace or add description
  let updatedFrontmatter;
  if (frontmatter.match(/description:\s*['"]/)) {
    // Replace existing description
    updatedFrontmatter = frontmatter.replace(
      /description:\s*['"][^'"]*['"]/,
      `description: '${newDescription.replace(/'/g, "\\'")}'`
    );
  } else {
    // Add description after title
    updatedFrontmatter = frontmatter.replace(
      /(title:\s*['"][^'"]*['"])/,
      `$1\ndescription: '${newDescription.replace(/'/g, "\\'")}'`
    );
  }

  const updatedContent = start + updatedFrontmatter + end + postContent;
  fs.writeFileSync(filepath, updatedContent);
}

async function main() {
  console.clear();

  p.intro('🤖 AI Description Generator');

  // Check if Claude CLI is installed
  if (!checkClaudeCLI()) {
    p.cancel('Claude Code CLI not found. Make sure the "claude" command is in your PATH.');
    p.note('Try running: which claude\nOr ensure Claude Code is properly installed.', 'Troubleshooting');
    process.exit(1);
  }

  const posts = getAllPosts();

  if (posts.length === 0) {
    p.cancel('No blog posts found in src/content/blog/');
    process.exit(1);
  }

  let selectedPost;
  const slugArg = process.argv[2];

  if (slugArg) {
    // Direct mode - find post by slug
    selectedPost = posts.find(post => post.slug === slugArg);

    if (!selectedPost) {
      p.cancel(`Post with slug "${slugArg}" not found.`);
      process.exit(1);
    }

    p.note(`Selected: ${selectedPost.title}${selectedPost.draft ? ' (draft)' : ''}`, 'Post');
  } else {
    // Interactive mode - select from list
    const selection = await p.select({
      message: 'Select a post to generate a description for:',
      options: posts.map(post => ({
        value: post.slug,
        label: `${post.title}${post.draft ? ' (draft)' : ''}`,
      })),
    });

    if (p.isCancel(selection)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    selectedPost = posts.find(post => post.slug === selection);
  }

  const filepath = path.join(BLOG_DIR, selectedPost.filename);
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const postContent = extractContent(fileContent);

  const s = p.spinner();
  s.start('Generating description with Claude...');

  let description;
  try {
    description = await generateDescription(postContent);
    s.stop('Description generated!');
  } catch (error) {
    s.stop('Failed to generate description');
    p.cancel(error.message);
    process.exit(1);
  }

  // Display description with proper formatting
  console.log('');
  p.log.message('Generated Description:');
  console.log('');

  // Wrap text at 80 characters for better readability
  const wrapText = (text, maxWidth = 80) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + word).length > maxWidth) {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    }

    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }

    return lines;
  };

  const wrappedLines = wrapText(description);
  wrappedLines.forEach(line => {
    console.log(`  ${line}`);
  });
  console.log('');

  const confirm = await p.confirm({
    message: 'Update the post with this description?',
    initialValue: true,
  });

  if (p.isCancel(confirm)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  if (confirm) {
    try {
      updateDescription(filepath, description);
      p.outro(`✅ Description updated successfully!`);
    } catch (error) {
      p.cancel(`Failed to update file: ${error.message}`);
      process.exit(1);
    }
  } else {
    p.outro('Description not saved.');
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
