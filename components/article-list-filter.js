export default function ArticleListFilter({
  value = '',
  categories,
  onFilterChange,
}) {
  const handleCatClick = (category) => {
    onFilterChange(category);
  };

  return (
    <section id="article-filter" className="m-t-30">
      <div className="container ">
        <div className="article-filter-outer">
          <div className="article-filter-container">
            <div
              className={`article-filter-item ${
                value === '' ? 'article-filter-item-active' : ''
              }`}
            >
              <button type="button" onClick={() => handleCatClick('')}>
                All
              </button>
            </div>
            {categories.length > 0
              ? categories.map((category) => (category.posts.edges.length ? (
                <div
                  key={category.slug}
                  className={`article-filter-item ${
                    value === category.slug
                      ? 'article-filter-item-active'
                      : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleCatClick(category.slug)}
                  >
                    {category.name}
                  </button>
                </div>
              ) : null))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
