import { defineCollection, z } from 'astro:content';

// "glossary" collection — for terms/definitions (like Webopedia Definitions)
const glossary = defineCollection({
  type: 'content',
  schema: z.object({
    term: z.string(),                 // Term name, e.g. "Blockchain"
    shortDefinition: z.string(),      // One concise sentence for preview/SEO
    category: z.string(),             // e.g. "Networking", "AI", "Security"
    letter: z.string().length(1),     // First letter for A-Z index
    updatedDate: z.coerce.date(),
    relatedTerms: z.array(z.string()).default([]),
    metaDescription: z.string().optional(),
  }),
});

// "articles" collection — for long-form articles/blog posts
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    relatedGlossary: z.array(z.string()).default([]),
    author: z.string(),
    authorAvatar: z.string().optional(),
    coverImage: z.string().optional(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { glossary, articles };
