import Head from 'next/head';
import {
  SITE_NAME, SITE_URL, SITE_DESCRIPTION, SHARE_IMAGE, SITE_INDEXABLE,
} from '../lib/site';
import { canonicalUrl, organizationSchema, serializeJsonLd } from '../lib/seo.mjs';

export default function PageSeo({
  title, description = SITE_DESCRIPTION, path = '/', image = SHARE_IMAGE,
  imageAlt = 'brightseed — websites, web apps and AI', type = 'website',
  structuredData = [], noindex = false,
}) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonical = canonicalUrl(path);
  const imageUrl = `${SITE_URL}${image || SHARE_IMAGE}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonical} key="canonical" />
      <meta name="robots" content={noindex || !SITE_INDEXABLE ? 'noindex, follow' : 'index, follow, max-image-preview:large'} key="robots" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {/* Escaping < prevents content from terminating the JSON-LD script element. */}
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" key="structured-data" dangerouslySetInnerHTML={{ __html: serializeJsonLd([organizationSchema(), ...structuredData]) }} />
    </Head>
  );
}
