import {
  SITE_NAME, SITE_URL, CONTACT_EMAIL, SHARE_IMAGE, SOCIAL_PROFILES, staticRoutes,
} from './site-config.mjs';
import { services } from './services.mjs';

export function canonicalUrl(path = '/') {
  const cleanPath = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return `${SITE_URL}${cleanPath || '/'}`;
}
export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon/android-chrome-192x192.png`,
    email: CONTACT_EMAIL,
    sameAs: SOCIAL_PROFILES,
  };
}
export function articleSchema(post) {
  const url = canonicalUrl(`/posts/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}${post.coverImage || SHARE_IMAGE}`,
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/about` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.label, item: canonicalUrl(item.path),
    })),
  };
}
export function sitemapEntries(posts, projects) {
  return [
    ...staticRoutes.map((path) => ({ url: canonicalUrl(path) })),
    ...services.map((service) => ({ url: canonicalUrl(`/services/${service.id}`) })),
    ...projects.map((project) => ({ url: canonicalUrl(`/portfolio/${project.slug}`) })),
    ...posts.map((post) => ({ url: canonicalUrl(`/posts/${post.slug}`), lastmod: post.updated || post.date })),
  ];
}
function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
export function sitemapXml(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(({ url, lastmod }) => `<url><loc>${escapeXml(url)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`;
}
