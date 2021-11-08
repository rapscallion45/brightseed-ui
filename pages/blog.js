import Head from 'next/head';
import parse from 'html-react-parser';
import ArticlesList from '../components/articles-list';
import BlogMainFeatured from '../components/blog-main-featured';
import Layout from '../components/layout';
import {
  getAllPostsForHome,
  getPageDataByUri,
  getPrimaryMenu,
} from '../lib/api';

const Blog = ({
  menuData,
  pageData: { seo },
  allPosts: { edges },
  preview,
}) => {
  const featuredPosts = edges.slice(0, 3);
  const morePosts = edges.slice(3);

  return (
    <>
      <Layout preview={preview} navMenuItems={menuData}>
        <Head>{parse(seo.fullHead)}</Head>
        <div className="container max-w-6xl mx-auto pt-20 pb-5 px-5">
          <BlogMainFeatured posts={featuredPosts} />
          {morePosts.length > 0 && <ArticlesList posts={morePosts} />}
        </div>
      </Layout>
    </>
  );
};
export default Blog;

export async function getStaticProps({ preview = false }) {
  const menuData = await getPrimaryMenu();
  const pageData = await getPageDataByUri('/blog');
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: {
      menuData, pageData, allPosts, preview,
    },
  };
}
