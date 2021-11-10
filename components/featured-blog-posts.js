import Link from 'next/link';
import parse from 'html-react-parser';
import PostPreview from './post-preview';
import ContactBanner from './contact-banner';

export default function FeaturedBlogPosts({ title, content, posts }) {
  return (
    <>
      <ContactBanner />
      <section id="blog-posts" className="no-padding">
        <div className="bg-light-grey py-24">
          <div className="container max-w-6xl mx-auto px-5 pb-6 md:pb-14 grid grid-cols-12 wow animated fadeInDown">
            <div
              id="blog-posts-heading"
              className="leading-tight col-span-12 md:col-span-4 lg:col-span-3 px-5 my-8 text-5xl font-bold"
            >
              <h2>{title}</h2>
            </div>
            <div
              id="blog-posts-heading"
              className="col-span-12 md:col-span-8 lg:col-span-9"
            >
              {parse(content)}
            </div>
          </div>
          <div className="container max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 wow animated fadeInUp">
            {posts.map(({ node }) => (
              <div className="mt-8 md:px-3 col-span-1">
                <PostPreview
                  key={node.slug}
                  title={node.title}
                  coverImage={node.featuredImage?.node}
                  date={node.date}
                  slug={node.slug}
                  excerpt={node.excerpt}
                  smallTitle
                />
              </div>
            ))}
            <div className="md:col-start-2 flex justify-center fullWidth wow animated fadeInUp pt-20">
              <Link href="/blog">
                <button type="button" className="btn btn-secondary btn-effect">
                  View Blog
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
