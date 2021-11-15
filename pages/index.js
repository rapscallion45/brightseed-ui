import Head from 'next/head';
import parse from 'html-react-parser';
import Layout from '../components/layout';
import Intro from '../components/intro';
import FeaturedBlogPosts from '../components/featured-blog-posts';
import HowWeWork from '../components/how-we-work';
import RecentWorks from '../components/recent-works';
import Testimonials from '../components/testimonials';
import ContactForm from '../components/contact-form';
import HomeSlider from '../components/home-slider';
import PriceModels from '../components/price-models';
import {
  getAllPostsForHome,
  getPageDataByUri,
  getPrimaryMenu,
  getHomeSlidersPosts,
  getFeaturedBlogPost,
  getHowWeWorkPosts,
  getTestimonialPosts,
  getClientLogosPosts,
  getRecentWorksPosts,
  getPriceModelsPosts,
} from '../lib/api';

const Index = ({
  menuData,
  pageData,
  homeSlidersPosts,
  howWeWorkPosts,
  featuredBlogPosts,
  recentWorksPosts,
  testimonialPosts,
  clientLogosPosts,
  priceModelsPosts,
  allPosts,
  preview,
}) => {
  const posts = allPosts.edges.slice(0, 3);

  return (
    <Layout navMenuItems={menuData} preview={preview}>
      <Head>{parse(pageData.seo.fullHead)}</Head>
      <HomeSlider slides={homeSlidersPosts} />
      <Intro content={pageData.content} />
      <HowWeWork items={howWeWorkPosts} />
      <RecentWorks items={recentWorksPosts} />
      <PriceModels items={priceModelsPosts} />
      <FeaturedBlogPosts
        title={featuredBlogPosts.title}
        content={featuredBlogPosts.content}
        posts={posts}
      />
      <Testimonials items={testimonialPosts} clientLogos={clientLogosPosts} />
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
  const homeSlidersPosts = await getHomeSlidersPosts();
  const featuredBlogPosts = await getFeaturedBlogPost();
  const howWeWorkPosts = await getHowWeWorkPosts();
  const recentWorksPosts = await getRecentWorksPosts();
  const testimonialPosts = await getTestimonialPosts();
  const clientLogosPosts = await getClientLogosPosts();
  const priceModelsPosts = await getPriceModelsPosts();
  return {
    props: {
      pageData,
      homeSlidersPosts,
      howWeWorkPosts,
      recentWorksPosts,
      featuredBlogPosts,
      testimonialPosts,
      clientLogosPosts,
      priceModelsPosts,
      menuData,
      allPosts,
      preview,
    },
  };
}
