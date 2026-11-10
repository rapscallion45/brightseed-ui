import Link from 'next/link';
import Layout from '../../components/layout';
import PageSeo from '../../components/page-seo';
import PostBody from '../../components/post-body';
import ContactDetails from '../../components/contact-details';
import { BlogCard, PageHeading, SectionHeading } from '../../components/agency-shared';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '../../lib/content.mjs';
import { articleSchema, breadcrumbSchema } from '../../lib/seo.mjs';
import Breadcrumbs from '../../components/breadcrumbs';
import BrandText from '../../components/brand-text';

export default function Post({ post, morePosts }) {
  const crumbs = [{ label: 'Home', path: '/' }, { label: 'Insights', path: '/blog' }, { label: post.title, path: `/posts/${post.slug}` }];
  return (
    <Layout>
      <PageSeo title={post.title} description={post.excerpt} path={`/posts/${post.slug}`} type="article" image={post.coverImage} imageAlt={post.coverImageAlt || post.title} structuredData={[articleSchema(post), breadcrumbSchema(crumbs)]} />
      <article>
        <PageHeading eyebrow={post.categories[0] || 'brightseed insights'} title={post.title}>
          <span className="agency-article-meta">
            <Link href="/about"><BrandText>{post.author}</BrandText></Link>
            {' '}
            ·
            {' '}
            <time dateTime={post.date}>
              {new Date(`${post.date}T12:00:00Z`).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
              })}
            </time>
            {post.updated && (
            <span>
              {' '}
              · Updated
              {' '}
              <time dateTime={post.updated}>
                {new Date(`${post.updated}T12:00:00Z`).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
                })}
              </time>
            </span>
            )}
          </span>
        </PageHeading>
        <Breadcrumbs items={crumbs} />
        {post.coverImage && <img className="agency-article-cover" src={post.coverImage} alt={post.coverImageAlt} width="1000" height="520" />}
        <div className="agency-prose">
          <PostBody content={post.content} />
          {post.tags.length > 0 && <div className="agency-tags" aria-label="Article topics">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        </div>
      </article>
      <section className="agency-section agency-news">
        <div className="agency-container">
          <SectionHeading eyebrow="Keep Reading" title="Related articles" />
          <div className="agency-three-grid">{morePosts.map((item) => <BlogCard key={item.slug} post={item} />)}</div>
        </div>
      </section>
      <ContactDetails title="Planning a digital product?" />
    </Layout>
  );
}

export function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  return {
    props: { post, morePosts: getRelatedPosts(post) },
  };
}

export function getStaticPaths() {
  return { paths: getAllPosts().map(({ slug }) => ({ params: { slug } })), fallback: false };
}
