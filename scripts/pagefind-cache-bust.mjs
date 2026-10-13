import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const version = (
  process.env.CF_PAGES_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
).slice(0, 12);

function patchFile(path, transform, label) {
  const source = readFileSync(path, 'utf8');
  const updated = transform(source);
  if (updated === source) {
    throw new Error(`Could not safely version ${label}; build stopped.`);
  }
  writeFileSync(path, updated);
}

const pagefindJs = join(dist, 'pagefind/pagefind.js');
patchFile(
  pagefindJs,
  source => source.replace(/pagefind-worker\.js(?:\?v=[^"'`)]*)?/g, `pagefind-worker.js?v=${version}`),
  'Pagefind worker URL',
);

const componentUiJs = join(dist, 'pagefind/pagefind-component-ui.js');
patchFile(
  componentUiJs,
  source => source.replace(/\$\{this\.options\.bundlePath\}pagefind\.js/g, `\$\{this.options.bundlePath\}pagefind.js?v=${version}`),
  'Pagefind engine URL',
);

let htmlCount = 0;
function patchHtml(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      patchHtml(path);
    } else if (entry.endsWith('.html')) {
      const source = readFileSync(path, 'utf8');
      const updated = source.replace(/(src=["']\/pagefind\/pagefind-component-ui\.js)(\?v=[^"']*)?(["'])/g, `$1?v=${version}$3`);
      if (updated !== source) {
        writeFileSync(path, updated);
        htmlCount++;
      }
    }
  }
}
patchHtml(dist);
if (htmlCount === 0) throw new Error('No HTML references to the Pagefind component script were versioned; build stopped.');
console.log(`Pagefind engine, worker, and component URLs versioned for deployment ${version} across ${htmlCount} HTML files.`);
