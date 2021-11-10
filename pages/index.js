import Head from 'next/head';
import parse from 'html-react-parser';
import FeaturedBlogPosts from '../components/featured-blog-posts';
import Intro from '../components/intro';
import Layout from '../components/layout';
import ContactForm from '../components/contact-form';
import {
  getAllPostsForHome,
  getPageDataByUri,
  getPrimaryMenu,
  getFeaturedBlogPost,
} from '../lib/api';

const Index = ({
  menuData, featuredBlogPost, pageData, allPosts, preview,
}) => {
  const posts = allPosts.edges.slice(0, 3);

  return (
    <Layout navMenuItems={menuData} preview={preview}>
      <Head>{parse(pageData.seo.fullHead)}</Head>
      <Intro content={pageData.content} />
      <FeaturedBlogPosts
        title={featuredBlogPost.title}
        content={featuredBlogPost.content}
        posts={posts}
      />
      <div className="container mx-auto max-w-6xl px-5 my-32 wow animate fadeInUp">
        <ContactForm title="Ready To Start Your Project? Contact Us!" />
      </div>
    </Layout>
  );
};
export default Index;

export async function getStaticProps({ preview = false }) {
  const menuData = await getPrimaryMenu();
  const pageData = await getPageDataByUri('/');
  const allPosts = await getAllPostsForHome(preview);
  const featuredBlogPost = await getFeaturedBlogPost();
  return {
    props: {
      pageData,
      featuredBlogPost,
      menuData,
      allPosts,
      preview,
    },
  };
}
