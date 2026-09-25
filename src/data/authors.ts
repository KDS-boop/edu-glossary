export interface Author {
  slug: string;
  name: string;
  bio: string;
  role: string;
  avatar?: string;
  email?: string;
  sameAs?: string[];           // Social profiles (LinkedIn, Twitter, GitHub, etc.)
  credentials?: string[];      // Degrees, certifications, titles
  expertise?: string[];        // Topic areas
  experience?: string;         // Years of experience, background
  organization?: {
    name: string;
    url: string;
    logo?: string;
  };
  publishedWorks?: {           // Notable publications
    title: string;
    url: string;
    year: number;
  }[];
}

export const authors: Author[] = [
  {
    slug: 'eduglossary-team',
    name: 'EduGlossary Team',
    bio: 'The EduGlossary Team creates clear, accessible explanations of technology and digital concepts for learners at every level. Our contributors include software engineers, security researchers, cloud architects, and technical writers with combined decades of industry experience.',
    role: 'Editorial Team',
    credentials: [
      'Collective 25+ years in software engineering, cybersecurity, and cloud architecture',
      'Contributors hold degrees in Computer Science, Information Security, and Data Science',
      'Industry certifications: AWS Solutions Architect, CISSP, CKAD, Google Cloud Professional'
    ],
    expertise: [
      'Software Development & APIs',
      'Cybersecurity & Encryption',
      'Cloud Computing & Infrastructure',
      'Blockchain & Decentralized Systems',
      'Machine Learning & Data Science',
      'Technical Writing & Documentation'
    ],
    experience: 'Our team spans senior engineers from FAANG companies, security consultants, cloud architects, and open-source maintainers. We\'ve built production systems serving millions of users, led incident response for critical infrastructure, and authored technical documentation used by developers worldwide.',
    organization: {
      name: 'EduGlossary',
      url: 'https://eduglossary.my.id',
      logo: '/images/logo.svg'
    },
    sameAs: [
      'https://github.com/eduglossary',
      'https://twitter.com/eduglossary',
      'https://linkedin.com/company/eduglossary'
    ],
    publishedWorks: [
      { title: 'Cybersecurity for Beginners: Essential Concepts You Need to Know', url: 'https://eduglossary.my.id/articles/cybersecurity-for-beginners/', year: 2026 },
      { title: 'Cloud Computing Explained: Types, Benefits, and How to Get Started', url: 'https://eduglossary.my.id/articles/cloud-computing-explained/', year: 2026 },
      { title: 'How Machine Learning Works: A Visual Guide', url: 'https://eduglossary.my.id/articles/how-machine-learning-works/', year: 2026 },
      { title: 'Proof of Work vs. Proof of Stake: Complete Comparison Guide', url: 'https://eduglossary.my.id/articles/proof-of-work-vs-proof-of-stake/', year: 2026 },
      { title: 'What is an API? A Complete Beginner\'s Guide', url: 'https://eduglossary.my.id/articles/what-is-an-api-beginners-guide/', year: 2026 },
      { title: 'Getting to Know Astro: A Framework for Fast Content Websites', url: 'https://eduglossary.my.id/articles/mengenal-astro-framework/', year: 2026 }
    ]
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
