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
} from '../lib/api';

const Index = ({
  menuData,
  pageData: { content, seo },
  allPosts: { edges },
  preview,
}) => {
  const posts = edges.slice(0, 3);

  return (
    <Layout navMenuItems={menuData} preview={preview}>
      <Head>{parse(seo.fullHead)}</Head>
      <Intro content={content} />
      <FeaturedBlogPosts posts={posts} />
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
  return {
    props: {
      pageData,
      menuData,
      allPosts,
      preview,
    },
  };
}
