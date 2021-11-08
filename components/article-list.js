import { useState } from 'react';
import ArticleListFilter from './article-list-filter';
import PostPreview from './post-preview';

export default function ArticleList({ posts, categories }) {
  const [filterVal, setFilterVal] = useState('');

  const onFilterChange = (category) => {
    setFilterVal(category);
  };

  const checkPostCategories = (element) => element.node.slug === filterVal;

  return (
    <section id="related-posts-links" className="no-padding-bottom">
      <div className="container mx-auto px-5 pt-5 pb-5">
        {categories && (
          <ArticleListFilter
            value={filterVal}
            categories={categories}
            onFilterChange={onFilterChange}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
          {posts
            .filter((post) => {
              if (filterVal !== '') return post.node.categories.edges.some(checkPostCategories);
              return post;
            })
            .map(({ node }) => (
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
