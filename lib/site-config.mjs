export const SITE_NAME = 'brightseed';
export const SITE_URL = 'https://brightseed.io';
export const CONTACT_EMAIL = 'contact@brightseed.io';
export const SITE_DESCRIPTION = 'brightseed designs and builds websites, custom web apps and practical AI solutions. Tell us what you want to improve and let’s plan your next project.';
export const SHARE_IMAGE = '/design/agency/share-card.png';
export const SOCIAL_PROFILES = [
  'https://www.facebook.com/brightseed.io',
  'https://www.instagram.com/brightseed.io/',
  'https://www.linkedin.com/company/brightseed-io/',
];
export const navigation = [
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Work' },
  { path: '/blog', label: 'Insights' },
  { path: '/contact', label: 'Contact' },
];
export const staticRoutes = ['/', '/about', '/services', '/portfolio', '/blog', '/contact', '/privacy', '/terms'];
// Set at build time on preview/staging deployments; canonicals stay on the public domain.
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE !== 'false';
