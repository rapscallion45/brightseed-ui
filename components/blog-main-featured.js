import PostPreview from './post-preview';

export default function BlogMainFeatured({ posts }) {
  return (
    <section id="main-articles">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => <PostPreview key={post.slug} {...post} smallTitle />)}
      </div>
    </section>
  );
}
