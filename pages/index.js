import Head from 'next/head';
import parse from 'html-react-parser';
import Layout from '../components/layout';
import Intro from '../components/intro';
import FeaturedBlogPosts from '../components/featured-blog-posts';
import HowWeWork from '../components/how-we-work';
import ContactForm from '../components/contact-form';
import {
  getAllPostsForHome,
  getPageDataByUri,
  getPrimaryMenu,
  getFeaturedBlogPost,
  getHowWeWorkPosts,
} from '../lib/api';

const Index = ({
  menuData,
  pageData,
  howWeWorkPosts,
  featuredBlogPost,
  allPosts,
  preview,
}) => {
  const posts = allPosts.edges.slice(0, 3);

  return (
    <Layout navMenuItems={menuData} preview={preview}>
      <Head>{parse(pageData.seo.fullHead)}</Head>
      <Intro content={pageData.content} />
      <HowWeWork items={howWeWorkPosts} />
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
  const howWeWorkPosts = await getHowWeWorkPosts();
  return {
    props: {
      pageData,
      howWeWorkPosts,
      featuredBlogPost,
      menuData,
      allPosts,
      preview,
    },
  };
}
