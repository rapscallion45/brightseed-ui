import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import PageSeo from '../components/page-seo';
import ContactDetails from '../components/contact-details';
import { BlogCard, PageHeading } from '../components/agency-shared';
import { getAllPosts } from '../lib/content.mjs';

export default function Blog({ posts }) {
  const router = useRouter();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState(null);
  const query = search ?? (typeof router.query.q === 'string' ? router.query.q : '');
  const categories = ['All', ...new Set(posts.flatMap((post) => post.categories))];
  const filtered = posts.filter((post) => (category === 'All' || post.categories.includes(category))
    && `${post.title} ${post.excerpt} ${post.categories.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <Layout>
      <PageSeo title="Web Development & AI Insights" description="Practical guides to planning websites, building web applications and evaluating AI features. Explore brightseed’s development and product advice." path="/blog" noindex={Boolean(query)} />
      <PageHeading eyebrow="The brightseed blog" title="Ideas for your next digital project">Practical notes on planning, building and improving websites, applications and AI features.</PageHeading>
      <section className="agency-section agency-news" id="all-posts">
        <div className="agency-container">
          <div className="agency-blog-toolbar">
            <div className="agency-filters" aria-label="Filter articles">
              {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <input type="search" aria-label="Search articles" placeholder="Search articles..." value={query} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className="agency-three-grid">{filtered.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
          {filtered.length === 0 && <p className="agency-empty" role="status">No articles match your search. Try a different word or category.</p>}
        </div>
      </section>
      <ContactDetails />
    </Layout>
  );
}

export function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}
