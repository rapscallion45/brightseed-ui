import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getAllPosts, getHomepage, getRelatedPosts } from '../lib/content.mjs';
import {
  articleSchema, canonicalUrl, organizationSchema, serializeJsonLd, sitemapEntries, sitemapXml,
} from '../lib/seo.mjs';

test('all public content is represented once in the sitemap, without drafts or query URLs', () => {
  const posts = getAllPosts();
  const entries = sitemapEntries(posts, getHomepage().projects);
  assert.equal(new Set(entries.map(({ url }) => url)).size, entries.length);
  posts.forEach((post) => assert.ok(entries.some(({ url }) => url.endsWith(`/posts/${post.slug}`))));
  assert.ok(entries.every(({ url }) => url.startsWith('https://brightseed.io/') && !/[?#]/.test(url)));
  assert.doesNotMatch(sitemapXml(entries), /draft-example|undefined|\/authors\//);
  assert.equal(canonicalUrl('/blog/?q=test#results'), 'https://brightseed.io/blog');
  assert.equal(canonicalUrl('/'), 'https://brightseed.io/');
});

test('JSON-LD cannot terminate its script when content contains HTML', () => {
  const payload = { headline: '</script><script>alert(1)</script>' };
  const serialized = serializeJsonLd(payload);
  assert.doesNotMatch(serialized, /</);
  assert.deepEqual(JSON.parse(serialized), payload);
});

test('article schema preserves publication dates and uses organisation attribution', () => {
  const posts = getAllPosts();
  posts.forEach((post) => {
    const data = articleSchema(post);
    assert.equal(post.author, 'brightseed');
    assert.equal(data.author['@type'], 'Organization');
    assert.equal(data.author.name, 'brightseed');
    assert.equal(data.datePublished, post.date);
    if (post.updated) {
      assert.ok(post.updated >= post.date);
      assert.equal(data.dateModified, post.updated);
    }
    assert.equal(data.publisher['@id'], organizationSchema()['@id']);
  });
  const original = posts.find((post) => post.slug === 'javascript-fullstack-developer-a-new-trend-in-web-development');
  assert.equal(original.date, '2018-02-26');
  assert.equal(original.updated, '2026-11-09');
});

test('related articles exclude the current article and prioritise shared topics', () => {
  const post = getAllPosts().find((item) => item.slug === 'cryptocurrency-marketplace-app-fundamentals');
  const related = getRelatedPosts(post);
  assert.equal(related[0].slug, 'building-a-cryptocurrency-marketplace-app');
  assert.ok(related.every((item) => item.slug !== post.slug));
  assert.equal(new Set(related.map((item) => item.slug)).size, related.length);
});

test('manifest and browser icon assets have working paths and the requested dimensions', () => {
  const manifest = JSON.parse(fs.readFileSync('public/favicon/site.webmanifest', 'utf8'));
  assert.equal(manifest.name, 'brightseed');
  const assets = [
    ...manifest.icons.map((icon) => [icon.src.split('?')[0], Number(icon.sizes.split('x')[0])]),
    ['/favicon/favicon-16x16.png', 16], ['/favicon/favicon-32x32.png', 32],
    ['/favicon/apple-touch-icon.png', 180], ['/favicon/mstile-150x150.png', 150],
  ];
  assets.forEach(([file, size]) => {
    const png = fs.readFileSync(path.join('public', file));
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  });
  const ico = fs.readFileSync('public/favicon/favicon.ico');
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  assert.deepEqual(ico, fs.readFileSync('public/favicon.ico'));
});
