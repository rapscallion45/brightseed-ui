import Layout from './layout';
import PageSeo from './page-seo';
import PostBody from './post-body';
import { PageHeading } from './agency-shared';

export default function ContentPage({ page, path, intro }) {
  return (
    <Layout>
      <PageSeo title={page.title} description={page.description} path={path} />
      {intro ?? <PageHeading eyebrow="brightseed" title={page.title} />}
      <article className="agency-prose"><PostBody content={page.content} /></article>
    </Layout>
  );
}
