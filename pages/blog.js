import Head from 'next/head';
import parse from 'html-react-parser';
import ArticleList from '../components/article-list';
import BlogMainFeatured from '../components/blog-main-featured';
import Layout from '../components/layout';
import ContactForm from '../components/contact-form';
import {
  getAllPostsForHome,
  getPageDataByUri,
  getPrimaryMenu,
  getCategories,
} from '../lib/api';

const Blog = ({
  menuData,
  pageData: { seo },
  categoryData,
  allPosts: { edges },
  preview,
}) => {
  const featuredPosts = edges.slice(0, 3);
  const morePosts = edges.slice(3);

  return (
    <>
      <Layout preview={preview} navMenuItems={menuData}>
        <Head>{parse(seo.fullHead)}</Head>
        <div className="container max-w-6xl mx-auto pt-32 pb-5 px-5">
          <BlogMainFeatured posts={featuredPosts} />
          {morePosts.length > 0 && (
            <ArticleList posts={morePosts} categories={categoryData} />
          )}
        </div>
        <div className="container mx-auto max-w-6xl px-5 mb-32 wow animated fadeInUp">
          <ContactForm title="Got An Idea For A Project? Get In Touch!" />
        </div>
      </Layout>
    </>
  );
};
export default Blog;

export async function getStaticProps({ preview = false }) {
  const menuData = await getPrimaryMenu();
  const pageData = await getPageDataByUri('/blog');
  const categoryData = await getCategories();
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: {
      menuData,
      pageData,
      categoryData,
      allPosts,
      preview,
    },
  };
}
