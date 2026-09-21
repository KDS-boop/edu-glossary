export interface Author {
  slug: string;
  name: string;
  bio: string;
  role: string;
}

export const authors: Author[] = [
  {
    slug: 'eduglossary-team',
    name: 'EduGlossary Team',
    bio: 'The EduGlossary Team creates clear, accessible explanations of technology and digital concepts for learners at every level.',
    role: 'Editorial Team',
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
