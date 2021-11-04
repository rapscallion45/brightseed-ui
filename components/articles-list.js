import PostPreview from './post-preview';

export default function ArticlesList({ posts }) {
  return (
    <section id="related-posts-links" className="no-padding-bottom">
      <div className="container mx-auto px-5 pt-5 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
          {posts.map(({ node }) => (
            <div className="mt-8 md:px-3">
              <PostPreview
                key={node.slug}
                title={node.title}
                coverImage={node.featuredImage?.node}
                date={node.date}
                author={node.author?.node}
                slug={node.slug}
                excerpt={node.excerpt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
