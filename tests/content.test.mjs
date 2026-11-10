import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  getAllPosts, getPage, getPostBySlug, getHomepage, renderMarkdown,
} from '../lib/content.mjs';

test('Markdown renders headings, links and code while removing executable HTML', () => {
  const html = renderMarkdown('# Heading\n\n[Safe](/blog)\n\n`const n = 1`\n\n<script>alert(1)</script><img src="/img/slide_bg.png" onerror="alert(1)"><a href="javascript:alert(1)">bad</a><iframe src="https://example.com"></iframe>');
  assert.match(html, /<h1>Heading<\/h1>/);
  assert.match(html, /href="\/blog"/);
  assert.match(html, /<code>const n = 1<\/code>/);
  assert.doesNotMatch(html, /<script|onerror|javascript:|<iframe/);
});

test('unknown posts and path traversal cannot read files outside the post directory', () => {
  ['../pages/home', '..%2fpages%2fhome', '/etc/passwd', 'missing-post', 'A\\B', undefined].forEach((slug) => {
    assert.equal(getPostBySlug(slug), null);
  });
});

test('brand styling preserves safe links, escaped text and code samples', () => {
  const html = renderMarkdown('[Brightseed](/contact) & company\n\n`Brightseed`');
  assert.match(html, /<a href="\/contact"><span class="brand-name">brightseed<\/span><\/a>/);
  assert.match(html, /&amp; company/);
  assert.match(html, /<code>Brightseed<\/code>/);
});

test('drafts are excluded from public lookup and listing', () => {
  assert.equal(getPostBySlug('draft-example'), null);
  assert.ok(getAllPosts().every((post) => post.slug !== 'draft-example'));
});

test('imported posts are sorted, serializable and have readable metadata', () => {
  const posts = getAllPosts();
  assert.ok(posts.length >= 4);
  assert.deepEqual(JSON.parse(JSON.stringify(posts)), posts);
  assert.deepEqual(posts.map((post) => post.date), posts.map((post) => post.date).sort().reverse());
  posts.forEach((post) => {
    assert.ok(post.title && post.excerpt && post.author && post.content);
    assert.ok(Array.isArray(post.categories) && Array.isArray(post.tags));
  });
});

test('published content and homepage assets no longer depend on the CMS', () => {
  const content = JSON.stringify([getAllPosts(), getHomepage(), getPage('home')]);
  assert.doesNotMatch(content, /cms\.brightseed\.io|wp-content/);
  const assets = [...content.matchAll(/\/media\/[a-zA-Z0-9/_.-]+/g)].map(([asset]) => asset);
  assert.ok(assets.length > 0);
  assets.forEach((asset) => assert.ok(fs.existsSync(path.join(process.cwd(), 'public', asset)), asset));
});

test('local pages render without a CMS', () => {
  ['home', 'privacy', 'terms'].forEach((slug) => {
    assert.ok(getPage(slug).content);
  });
  assert.equal(getPage('../posts/draft-example'), null);
});
