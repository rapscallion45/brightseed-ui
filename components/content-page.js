import Layout from './layout';
import PageSeo from './page-seo';
import PostBody from './post-body';
import { PageHeading } from './agency-shared';

export default function ContentPage({
  page, path, children, eyebrow = 'brightseed', heading = page.title,
}) {
  return (
    <Layout>
      <PageSeo title={page.title} description={page.description} path={path} />
      <PageHeading eyebrow={eyebrow} title={heading} />
      {children}
      <article className="agency-prose"><PostBody content={page.content} /></article>
    </Layout>
  );
}
