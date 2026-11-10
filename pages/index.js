import Layout from '../components/layout';
import PageSeo from '../components/page-seo';
import AgencyHome from '../components/agency-home';
import { getAllPosts, getPage, getHomepage } from '../lib/content.mjs';

export default function Home({ page, posts, homepage }) {
  return (
    <Layout>
      <PageSeo title={page.title} description={page.description} />
      <AgencyHome homepage={homepage} posts={posts} />
    </Layout>
  );
}

export function getStaticProps() {
  return { props: { page: getPage('home'), posts: getAllPosts().slice(0, 3), homepage: getHomepage() } };
}
