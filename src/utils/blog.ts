import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => !post.data.draft);
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function getPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter(
    (post) => post.data.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) =>
    post.data.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const categories = new Set(posts.map((post) => post.data.category));
  return Array.from(categories).sort();
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  const tags = new Set(posts.flatMap((post) => post.data.tags));
  return Array.from(tags).sort();
}

export async function getRelatedPosts(
  currentPost: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  const allPosts = await getPublishedPosts();
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug);

  const scoredPosts = otherPosts.map((post) => {
    let score = 0;

    if (post.data.category === currentPost.data.category) {
      score += 3;
    }

    const commonTags = post.data.tags.filter((tag) =>
      currentPost.data.tags.includes(tag)
    );
    score += commonTags.length;

    return { post, score };
  });

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0)
    .slice(0, limit)
    .map((item) => item.post);
}

export function paginatePosts(
  posts: BlogPost[],
  pageSize: number
): BlogPost[][] {
  const pages: BlogPost[][] = [];
  for (let i = 0; i < posts.length; i += pageSize) {
    pages.push(posts.slice(i, i + pageSize));
  }
  return pages;
}
