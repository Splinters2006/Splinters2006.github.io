import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const project = fileURLToPath(new URL('../', import.meta.url));
let siteUrl;
try {
  siteUrl = new URL(process.argv[2]);
  if (!['http:', 'https:'].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash) throw new Error();
} catch {
  console.error('Usage : node scripts/prepare-pages.mjs https://UTILISATEUR.github.io/DEPOT/');
  process.exit(1);
}
siteUrl.pathname = siteUrl.pathname.replace(/\/?$/, '/');

const source = path.join(project, 'dist');
const output = path.join(project, '_site');
const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let html = readFileSync(path.join(source, 'index.html'), 'utf8');
const imageTag = /<meta property="og:image" content="[^"]*">/;
if (!imageTag.test(html) || !html.includes('  <title>')) throw new Error('Métadonnées introuvables dans dist/index.html.');
html = html.replace(imageTag, `<meta property="og:image" content="${escapeAttribute(new URL('assets/metwo-avatar.png', siteUrl).href)}">`);
html = html.replace('  <title>', `  <meta property="og:url" content="${escapeAttribute(siteUrl.href)}">\n  <link rel="canonical" href="${escapeAttribute(siteUrl.href)}">\n  <title>`);

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(source, output, { recursive: true });
writeFileSync(path.join(output, 'index.html'), html);
writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Site prêt dans _site/ pour ${siteUrl.href}`);
