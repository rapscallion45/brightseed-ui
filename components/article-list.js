import { useState } from 'react';
import ArticleListFilter from './article-list-filter';
import PostPreview from './post-preview';

const PAGE_SIZE = 4;

export default function ArticleList({ posts }) {
  const [category, setCategory] = useState('');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const categories = [...new Set(posts.flatMap((post) => post.categories))].sort();
  const filteredPosts = posts.filter((post) => !category || post.categories.includes(category));

  const onFilterChange = (value) => {
    setCategory(value);
    setDisplayCount(PAGE_SIZE);
  };

  return (
    <section id="all-posts" className="no-padding-bottom">
      <ArticleListFilter value={category} categories={categories} onFilterChange={onFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {filteredPosts.slice(0, displayCount).map((post) => (
          <div key={post.slug} className="mt-8 md:px-3">
            <PostPreview {...post} />
          </div>
        ))}
      </div>
      {filteredPosts.length > displayCount && (
        <div className="flex justify-center mb-16">
          <button type="button" className="btn btn-secondary btn-effect" onClick={() => setDisplayCount(displayCount + PAGE_SIZE)}>
            More Posts
          </button>
        </div>
      )}
    </section>
  );
}
