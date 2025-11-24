import { getCollection, type CollectionEntry } from 'astro:content';

export type Resource = CollectionEntry<'resources'>;

export async function getAllResources(): Promise<Resource[]> {
  const resources = await getCollection('resources');
  return resources.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getResourcesByCategory(
  category: string
): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources.filter(
    (resource) =>
      resource.data.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getAllCategories(): Promise<string[]> {
  const resources = await getAllResources();
  const categories = new Set(resources.map((resource) => resource.data.category));
  return Array.from(categories).sort();
}
