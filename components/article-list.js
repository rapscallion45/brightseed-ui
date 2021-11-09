import { useState } from 'react';
import ArticleListFilter from './article-list-filter';
import PostPreview from './post-preview';

const DEFAULT_DISPLAY_POSTS_NUM = 4;

export default function ArticleList({ posts, categories }) {
  const [filterVal, setFilterVal] = useState('');
  const [displayNum, setDisplayNum] = useState(DEFAULT_DISPLAY_POSTS_NUM);

  const onFilterChange = (category) => {
    setFilterVal(category);
  };

  const handleShowMore = () => {
    setDisplayNum(displayNum + DEFAULT_DISPLAY_POSTS_NUM);
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
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-20">
          {posts
            .slice(0, displayNum)
            .filter((post) => {
              if (filterVal !== '') return post.node.categories.edges.some(checkPostCategories);
              return post;
            })
            .map(({ node }) => (
              <div key={node.slug} className="mt-8 md:px-3">
                <PostPreview
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
        {posts.length >= displayNum && (
          <div className="flex justify-center fullWidth mb-32">
            <button
              type="button"
              className="btn btn-secondary btn-effect"
              onClick={handleShowMore}
            >
              More Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
