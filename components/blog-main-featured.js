import PostPreview from './post-preview';

export default function BlogMainFeatured({ posts }) {
  return (
    <section id="main-articles">
      <div className="container mx-auto m-t-30 grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1 md:col-span-8 px-4 main-article">
          <PostPreview
            title={posts[0].node.title}
            coverImage={posts[0].node.featuredImage?.node}
            date={posts[0].node.date}
            author={posts[0].node.author?.node}
            slug={posts[0].node.slug}
            excerpt={posts[0].node.excerpt}
            mainFeatured
          />
        </div>
        <div className="col-span-1 md:col-span-4 md:col-start-9 px-4 pt-16 md:pt-0">
          {posts.slice(1, 3).map((post) => (
            <div className="sub-main-article">
              <PostPreview
                key={post.node.slug}
                title={post.node.title}
                coverImage={post.node.featuredImage?.node}
                date={post.node.date}
                slug={post.node.slug}
                smallTitle
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
