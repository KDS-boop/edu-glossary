import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const accessibleCodeBlocks = {
  name: 'accessible-code-blocks',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const outputDir = fileURLToPath(dir);
      const addTabIndex = async (directory) => {
        for (const entry of await readdir(directory, { withFileTypes: true })) {
          const filePath = join(directory, entry.name);
          if (entry.isDirectory()) {
            await addTabIndex(filePath);
          } else if (entry.isFile() && entry.name.endsWith('.html')) {
            const html = await readFile(filePath, 'utf8');
            let accessibleHtml = html.replace(
              /<pre\b(?=[^>]*\bdata-language=)(?![^>]*\btabindex=)([^>]*)>/g,
              '<pre tabindex="0"$1>'
            );

            // Put content tables inside a keyboard-focusable region. The PQC comparison
            // already has a specifically labelled wrapper in its source content.
            accessibleHtml = accessibleHtml.replace(
              /<table\b(?![^>]*\bpqc-standards-table\b)([^>]*)>([\s\S]*?)<\/table>/gi,
              (_match, attributes, content) => {
                const headerMatch = content.match(/<th\b[^>]*>([\s\S]*?)<\/th>/i);
                const headerText = headerMatch
                  ? headerMatch[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&#x([0-9a-f]+);/gi, (_entity, hex) => String.fromCharCode(parseInt(hex, 16))).replace(/&#(\d+);/g, (_entity, code) => String.fromCharCode(Number(code))).replace(/\s+/g, ' ').trim().slice(0, 70)
                  : '';
                const label = headerText ? `Scrollable table: ${headerText}` : 'Scrollable data table';
                const escapedLabel = label.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
                return `<div class="table-scroll" role="group" tabindex="0" aria-label="${escapedLabel}"><table${attributes}>${content}</table></div>`;
              }
            );

            if (accessibleHtml !== html) await writeFile(filePath, accessibleHtml);
          }
        }
      };
      await addTabIndex(outputDir);
    },
  },
};

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
  integrations: [
    expressiveCode(),
    sitemap(),
    accessibleCodeBlocks,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
