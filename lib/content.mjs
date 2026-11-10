import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const contentRoot = path.join(process.cwd(), 'content');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function renderMarkdown(markdown) {
  return sanitizeHtml(marked.parse(markdown), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height'],
      code: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    // textFilter receives escaped text, so generated brand markup cannot introduce unsafe HTML.
    textFilter: (text, tagName) => (tagName === 'code' || tagName === 'pre'
      ? text : text.replace(/\bbrightseed\b/gi, '<span class="brand-name">brightseed</span>')),
  });
}

function readEntry(directory, slug) {
  if (typeof slug !== 'string' || !slugPattern.test(slug)) return null;
  const file = path.join(contentRoot, directory, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    throw new Error(`Invalid draft flag in ${directory}/${slug}.md; use true or false`);
  }
  if (typeof data.title !== 'string' || !data.title.trim()) {
    throw new Error(`Missing title in ${directory}/${slug}.md`);
  }
  return { data, content };
}

function stringList(value, field, slug) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !item.trim())) {
    throw new Error(`Invalid ${field} in posts/${slug}.md`);
  }
  return [...new Set(value)];
}

export function getPostBySlug(slug) {
  const entry = readEntry('posts', slug);
  if (!entry || entry.data.draft === true) return null;
  const { data, content } = entry;
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)
      || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
    throw new Error(`Invalid date in posts/${slug}.md; use YYYY-MM-DD`);
  }
  if (typeof data.excerpt !== 'string' || !data.excerpt.trim()) {
    throw new Error(`Missing excerpt in posts/${slug}.md`);
  }
  const updated = data.updated instanceof Date
    ? data.updated.toISOString().slice(0, 10) : data.updated || null;
  if (updated !== null && (typeof updated !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(updated)
      || Number.isNaN(Date.parse(updated))
      || new Date(updated).toISOString().slice(0, 10) !== updated
      || updated < date)) {
    throw new Error(`Invalid updated date in posts/${slug}.md; use a date on or after publication`);
  }
  const coverImage = data.coverImage || null;
  if (coverImage !== null && (typeof coverImage !== 'string'
      || !/^\/(?!\/)[a-zA-Z0-9/_-]+\.(?:png|jpe?g|webp|avif)$/.test(coverImage)
      || !fs.existsSync(path.join(process.cwd(), 'public', coverImage)))) {
    throw new Error(`Invalid local coverImage in posts/${slug}.md`);
  }
  return {
    slug,
    title: data.title,
    date,
    updated,
    excerpt: data.excerpt,
    author: typeof data.author === 'string' ? data.author : 'brightseed',
    coverImage,
    coverImageAlt: typeof data.coverImageAlt === 'string' ? data.coverImageAlt : '',
    categories: stringList(data.categories, 'categories', slug),
    tags: stringList(data.tags, 'tags', slug),
    content: renderMarkdown(content),
  };
}

export function getAllPosts() {
  const directory = path.join(contentRoot, 'posts');
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => getPostBySlug(file.slice(0, -3)))
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getRelatedPosts(post, limit = 3) {
  const score = (candidate) => candidate.tags.filter((tag) => post.tags.includes(tag)).length * 3
    + candidate.categories.filter((category) => post.categories.includes(category)).length;
  return getAllPosts().filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function getPage(slug) {
  const entry = readEntry('pages', slug);
  if (!entry) return null;
  return {
    title: entry.data.title,
    description: typeof entry.data.description === 'string' ? entry.data.description : '',
    content: renderMarkdown(entry.content),
  };
}

export function getHomepage() {
  const data = JSON.parse(fs.readFileSync(path.join(contentRoot, 'homepage.json'), 'utf8'));
  function renderSections(value) {
    if (Array.isArray(value)) return value.map(renderSections);
    if (!value || typeof value !== 'object') return value;
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      (key === 'content' || key === 'excerpt') && typeof item === 'string'
        ? renderMarkdown(item) : renderSections(item),
    ]));
  }
  return renderSections(data);
}
