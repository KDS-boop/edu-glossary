import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pagefindScript = fileURLToPath(new URL('../dist/pagefind/pagefind.js', import.meta.url));
const deploymentVersion = (
  process.env.CF_PAGES_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
).slice(0, 12);

const source = readFileSync(pagefindScript, 'utf8');
const updated = source.replace(
  /pagefind-worker\.js(?:\?v=[^"'`)]*)?/g,
  `pagefind-worker.js?v=${deploymentVersion}`,
);

if (updated === source || !updated.includes(`pagefind-worker.js?v=${deploymentVersion}`)) {
  throw new Error('Could not safely version the generated Pagefind worker URL; build stopped.');
}

writeFileSync(pagefindScript, updated);
console.log(`Pagefind worker cache key set to deployment ${deploymentVersion}.`);
