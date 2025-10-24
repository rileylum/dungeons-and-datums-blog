import rss from '@astrojs/rss';
import { getPublishedPosts } from '../utils/blog';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'Dungeons and Datums',
    description:
      'A blog exploring the intersection of role-playing games and data science',
    site: context.site || 'https://dungeonsanddatums.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
