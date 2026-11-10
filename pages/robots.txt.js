import { SITE_URL, SITE_INDEXABLE } from '../lib/site';

export default function Robots() { return null; }
export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // Let crawlers read preview noindex directives. Protect private hosts with authentication.
  res.write(`User-agent: *\nAllow: /\n${SITE_INDEXABLE ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`);
  res.end();
  return { props: {} };
}
