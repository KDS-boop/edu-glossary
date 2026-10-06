import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

/**
 * Astro 5 tidak lagi menjamin urutan entri dari getCollection() (di Astro 4 urutannya
 * mengikuti path file). Urutkan per id supaya hasil build deterministik dan sama seperti
 * sebelumnya, terutama untuk slice()/sort() yang bergantung pada urutan awal.
 */
export async function getCollectionSorted<C extends CollectionKey>(
  name: C,
  filter?: (entry: CollectionEntry<C>) => unknown,
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(name, filter as never);
  return entries.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
