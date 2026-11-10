export default function ArticleListFilter({ value, categories, onFilterChange }) {
  return (
    <div id="article-filter" className="article-filter-container">
      {['', ...categories].map((category) => (
        <div key={category} className={`article-filter-item ${value === category ? 'article-filter-item-active' : ''}`}>
          <button type="button" aria-pressed={value === category} onClick={() => onFilterChange(category)}>
            {category || 'All'}
          </button>
        </div>
      ))}
    </div>
  );
}
