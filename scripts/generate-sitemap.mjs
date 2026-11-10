import fs from 'node:fs';
import { getAllPosts, getHomepage } from '../lib/content.mjs';
import { sitemapEntries, sitemapXml } from '../lib/seo.mjs';

// Resolve content and validate its assets while the full source tree is available.
// Production serves the resulting XML directly, without a serverless content reader.
const entries = sitemapEntries(getAllPosts(), getHomepage().projects);
fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemapXml(entries));
process.stdout.write(`Generated sitemap.xml with ${entries.length} public URLs.\n`);
