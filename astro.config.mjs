import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eduglossary.my.id',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  redirects: {
    '/glossary/kategori/pengembangan-perangkat-lunak/': '/glossary/categories/software-development/',
    '/glossary/kategori/keamanan-siber/': '/glossary/categories/cybersecurity/',
    '/glossary/kategori/ai-dan-data/': '/glossary/categories/ai-and-data/',
    '/articles/kategori/teknologi/': '/articles/categories/technology/',
    '/glossary/kategori/': '/glossary/categories/',
    '/articles/kategori/': '/articles/categories/',
    '/glossary/kategori/ai-and-data/': '/glossary/categories/ai-and-data/',
    '/glossary/kategori/blockchain/': '/glossary/categories/blockchain/',
    '/glossary/kategori/cloud-computing/': '/glossary/categories/cloud-computing/',
    '/glossary/kategori/cybersecurity/': '/glossary/categories/cybersecurity/',
    '/glossary/kategori/software-development/': '/glossary/categories/software-development/',
    '/articles/kategori/technology/': '/articles/categories/technology/',
  },
  integrations: [sitemap()],
});
