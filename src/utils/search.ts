import Fuse from 'fuse.js';
import type { BlogPost } from './blog';

export interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
}

export function createSearchIndex(posts: BlogPost[], contents: string[]) {
  const searchablePosts: SearchablePost[] = posts.map((post, index) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    category: post.data.category,
    tags: post.data.tags,
    content: contents[index] || '',
  }));

  return new Fuse(searchablePosts, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'description', weight: 2 },
      { name: 'tags', weight: 1.5 },
      { name: 'category', weight: 1 },
      { name: 'content', weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  });
}

export function searchPosts(
  fuse: Fuse<SearchablePost>,
  query: string
): SearchablePost[] {
  if (!query.trim()) {
    return [];
  }

  const results = fuse.search(query);
  return results.map((result) => result.item);
}
