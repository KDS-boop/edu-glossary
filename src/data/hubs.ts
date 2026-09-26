export interface Hub {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  glossarySlugs: string[];
  articleSlugs: string[];
  relatedHubs: string[];
}

export const hubs: Hub[] = [
  {
    slug: 'blockchain',
    title: 'Blockchain & Decentralization',
    description: 'Explore blockchain technology, consensus mechanisms, and decentralized systems — from proof of work to Merkle trees.',
    intro: [
      'Blockchain is a distributed ledger technology that records transactions across a network of computers without relying on a central authority. Each block contains a batch of transactions, a timestamp, and a cryptographic hash linking it to the previous block.',
      'Decentralization is the core principle behind blockchain — no single entity controls the network. Instead, participants collectively validate and agree on the state of the ledger through consensus mechanisms like Proof of Work or Proof of Stake.',
      'Understanding these concepts is essential for anyone working with cryptocurrency, smart contracts, or decentralized applications. The building blocks — hashing, Merkle trees, and consensus — appear across many areas of modern technology.',
    ],
    glossarySlugs: [
      'blockchain',
      'consensus-mechanism',
      'decentralization',
      'proof-of-work',
      'proof-of-stake',
      'merkle-tree',
      'sha-256',
      'smart-contract',
    ],
    articleSlugs: ['proof-of-work-vs-proof-of-stake'],
    relatedHubs: ['cybersecurity'],
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing & Infrastructure',
    description: 'Learn about cloud service providers, virtualization, storage systems, and the infrastructure that powers modern applications.',
    intro: [
      'Cloud computing delivers computing resources — servers, storage, databases, networking — over the internet on a pay-as-you-go basis. Instead of owning physical hardware, organizations rent capacity from cloud service providers.',
      'Virtualization technology makes this possible by abstracting physical hardware into software-defined resources. Virtual machines, containers, and hypervisors allow multiple isolated workloads to run on shared infrastructure.',
      'Storage solutions range from simple file storage to complex Storage Area Networks (SANs) designed for high-performance workloads. Hybrid cloud storage combines on-premises and cloud resources for flexibility and cost optimization.',
    ],
    glossarySlugs: [
      'cloud-service-provider',
      'virtualization-software',
      'storage-area-network',
      'hybrid-cloud-storage',
    ],
    articleSlugs: ['cloud-computing-explained'],
    relatedHubs: ['software-development'],
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    description: 'Understand APIs, CI/CD pipelines, codebases, and the practices that shape modern software engineering.',
    intro: [
      'Software development is the process of designing, building, and maintaining applications. Modern development relies on well-defined interfaces (APIs), version-controlled codebases, and automated delivery pipelines.',
      'APIs (Application Programming Interfaces) define how software components communicate. From REST endpoints to API gateways, interfaces are the backbone of distributed systems and microservices architectures.',
      'Continuous Integration and delivery practices ensure code changes are automatically tested and deployed. A well-organized codebase and full-stack awareness help teams build and maintain reliable software at scale.',
    ],
    glossarySlugs: [
      'api',
      'api-gateway',
      'rest-api',
      'codebase',
      'continuous-integration',
      'full-stack',
      'version-control',
    ],
    articleSlugs: ['mengenal-astro-framework', 'what-is-an-api-beginners-guide'],
    relatedHubs: ['cloud-computing', 'cybersecurity'],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Discover encryption, firewalls, attack vectors, and the principles that protect systems and data.',
    intro: [
      'Cybersecurity is the practice of protecting systems, networks, and data from digital attacks. It spans encryption techniques, network defenses, and threat detection — all aimed at keeping information confidential, intact, and available.',
      'End-to-end encryption ensures that data is readable only by the intended recipient, while firewalls filter network traffic to block unauthorized access. Understanding common attack methods like brute force attacks is key to building effective defenses.',
      'Cryptographic hash functions like SHA-256 underpin many security systems, from password storage to blockchain integrity. These concepts form the foundation of trust in digital systems.',
    ],
    glossarySlugs: [
      'end-to-end-encryption',
      'firewall',
      'brute-force-attack',
      'sha-256',
      'vpn',
      'symmetric-encryption',
    ],
    articleSlugs: ['cybersecurity-for-beginners'],
    relatedHubs: ['blockchain', 'software-development'],
  },
  {
    slug: 'ai-and-data',
    title: 'AI & Data',
    description: 'Explore machine learning, training data, predictive analytics, and the technologies behind intelligent systems.',
    intro: [
      'Artificial intelligence and data science are transforming how organizations make decisions. Machine learning algorithms learn patterns from data to make predictions, classify information, and automate complex tasks.',
      'Training data is the foundation of any machine learning system — the quality and diversity of data directly impact model performance. Concepts like overfitting, validation sets, and data mining are essential for building reliable models.',
      'From chatbots powered by natural language processing to predictive analytics that forecast trends, AI applications are expanding across every industry. Understanding these building blocks helps you evaluate and implement AI solutions effectively.',
    ],
    glossarySlugs: [
      'machine-learning',
      'deep-learning',
      'natural-language-processing',
      'training-data',
      'predictive-analytics',
      'chatbot',
    ],
    articleSlugs: ['how-machine-learning-works'],
    relatedHubs: ['software-development'],
  },
];

export function getHubBySlug(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}
