import { getAllPosts, getHomepage } from '../lib/content.mjs';
import { sitemapEntries, sitemapXml } from '../lib/seo.mjs';

export default function Sitemap() { return null; }
export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  res.write(sitemapXml(sitemapEntries(getAllPosts(), getHomepage().projects)));
  res.end();
  return { props: {} };
}
