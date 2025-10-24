#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

console.log('Cleaning up example blog posts...');

try {
  const files = fs.readdirSync(BLOG_DIR);
  const exampleFiles = files.filter(file => file.startsWith('example-') && file.endsWith('.md'));

  if (exampleFiles.length === 0) {
    console.log('ℹ️  No example posts found to clean up.');
    process.exit(0);
  }

  console.log(`Found ${exampleFiles.length} example post(s) to remove:`);

  exampleFiles.forEach(file => {
    const filepath = path.join(BLOG_DIR, file);
    fs.unlinkSync(filepath);
    console.log(`  ❌ Deleted: ${file}`);
  });

  console.log(`\n✅ Successfully removed ${exampleFiles.length} example post(s)!`);
} catch (error) {
  console.error('❌ Error cleaning up posts:', error.message);
  process.exit(1);
}
