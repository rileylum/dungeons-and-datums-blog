import rss from '@astrojs/rss';
import { getPublishedPosts } from '../utils/blog';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'Dungeons and Datums',
    description:
      'Adelaide\'s Old School D&D, OSR, and NSR gaming blog - resources, tools, campaign journals, and community content from Australia',
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
