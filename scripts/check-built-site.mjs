import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getAllPosts, getHomepage } from '../lib/content.mjs';
import { sitemapEntries, sitemapXml } from '../lib/seo.mjs';

const entries = sitemapEntries(getAllPosts(), getHomepage().projects);
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
assert.equal(sitemap, sitemapXml(entries), 'Static sitemap must match all current published content');
assert.ok(entries.every(({ url }) => new URL(url).origin === 'https://brightseed.io'), 'Sitemap must use the preferred root domain');
const serverPages = JSON.parse(fs.readFileSync('.next/server/pages-manifest.json', 'utf8'));
assert.ok(!serverPages['/sitemap.xml'], 'Sitemap must not depend on a serverless page');
const routes = new Set(entries.map(({ url }) => new URL(url).pathname));
const pages = new Map();
const decode = (value) => value.replace(/&amp;/g, '&');
entries.forEach(({ url }) => {
  const route = new URL(url).pathname;
  const file = path.join('.next/server/pages', route === '/' ? 'index.html' : `${route}.html`);
  const html = fs.readFileSync(file, 'utf8');
  const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  pages.set(route, body);
  assert.equal([...body.matchAll(/<h1\b/g)].length, 1, `${route}: main heading`);
  assert.match(body, /<title\b[^>]*>[^<]+\| brightseed<\/title>/, `${route}: title`);
  assert.ok(body.includes(`rel="canonical" href="${url}"`), `${route}: canonical`);
  assert.ok(body.includes(`property="og:url" content="${url}"`), `${route}: preferred social URL`);
  ['description', 'robots', 'twitter:card'].forEach((name) => assert.ok(body.includes(`name="${name}"`), `${route}: ${name}`));
  ['og:title', 'og:description', 'og:url', 'og:image'].forEach((name) => assert.ok(body.includes(`property="${name}"`), `${route}: ${name}`));
  const json = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(json.length, 1, `${route}: JSON-LD`);
  const schemas = JSON.parse(json[0][1]);
  assert.doesNotMatch(JSON.stringify(schemas), /https?:\/\/www\.brightseed\.io(?:\/|"|$)/, `${route}: preferred schema origin`);
  assert.ok(schemas.some((item) => item['@type'] === 'Organization'));
  if (route.startsWith('/posts/')) assert.ok(schemas.some((item) => item['@type'] === 'BlogPosting'));
  [...body.matchAll(/<img\b[^>]*src="([^"]+)"/g)].forEach((match) => {
    const source = decode(match[1]);
    const src = source.startsWith('/_next/image?')
      ? new URL(source, 'https://brightseed.io').searchParams.get('url') : source;
    assert.ok(src, `${route}: missing image source`);
    if (src.startsWith('/')) assert.ok(fs.existsSync(path.join('public', src.split('?')[0])), `${route}: missing image ${src}`);
  });
  assert.doesNotMatch(body, /64\.227\.37\.176|\/authors\//);
});
pages.forEach((body, route) => {
  [...body.matchAll(/<a\b[^>]*href="([^"]+)"/g)].forEach((match) => {
    const href = decode(match[1]);
    if (!href.startsWith('/') && !href.startsWith('#')) return;
    const target = new URL(href, `https://brightseed.io${route}`);
    const targetRoute = target.pathname.replace(/\/$/, '') || '/';
    assert.ok(routes.has(targetRoute) || fs.existsSync(path.join('public', targetRoute)), `${route}: broken link ${href}`);
    if (target.hash && pages.has(targetRoute)) assert.ok(pages.get(targetRoute).includes(`id="${target.hash.slice(1)}"`), `${route}: missing anchor ${href}`);
  });
});
const blogLinks = new Set([...pages.get('/blog').matchAll(/href="(\/posts\/[^"?#]+)"/g)].map((match) => match[1]));
getAllPosts().forEach((post) => assert.ok(blogLinks.has(`/posts/${post.slug}`), `Blog archive is missing ${post.slug}`));
const share = fs.readFileSync('public/design/agency/share-card.png');
assert.equal(share.readUInt32BE(16), 1200);
assert.equal(share.readUInt32BE(20), 630);
const notFound = fs.readFileSync('.next/server/pages/404.html', 'utf8');
assert.match(notFound, /noindex, follow/);
process.stdout.write(`Checked ${pages.size} built pages: metadata, schemas, headings, images, internal links and all ${blogLinks.size} article links. Static sitemap, preferred domain, sharing card and 404 indexing policy passed.\n`);
