import PostPreview from "./post-preview";
import ContactBanner from "./contact-banner";

export default function FeaturedBlogPosts({ posts }) {
  return (
    <>
      <ContactBanner />
      <section id="blog-posts" class="no-padding">
        <div class="bg-light-grey p-t-50">
          <div class="container max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3">
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
          </div>
        </div>
      </section>
    </>
  );
}
