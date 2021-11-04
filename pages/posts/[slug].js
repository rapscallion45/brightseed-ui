import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import PostFooter from '../../components/post-footer';
import Layout from '../../components/layout';
import {
  getAllPostsWithSlug,
  getPostAndMorePosts,
  getPrimaryMenu,
} from '../../lib/api';
import PostTitle from '../../components/post-title';
import { CMS_NAME } from '../../lib/constants';
import Tags from '../../components/tags';
import PostThanksText from '../../components/post-thanks-text';

export default function Post({
  menuData, post, posts, preview,
}) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview} navMenuItems={menuData}>
      {router.isFallback ? (
        <div className="container mx-auto px-5 pt-20">
          <PostTitle>Loading…</PostTitle>
        </div>
      ) : (
        <>
          <section className="article-content">
            <div className="container mx-auto px-5 pt-20">
              <article>
                <Head>
                  <title>
                    {post.title}
                    {' '}
                    | Next.js Blog Example with
                    {CMS_NAME}
                  </title>
                  <meta
                    property="og:image"
                    content={post.featuredImage?.node?.sourceUrl}
                  />
                </Head>
                <PostHeader
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.featuredImage?.node}
                  date={post.date}
                  author={post.author?.node}
                  categories={post.categories}
                />
                <PostBody content={post.content} />
                <footer>
                  {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
                </footer>
              </article>
            </div>
          </section>
          <PostThanksText />
          <PostFooter morePosts={morePosts} />
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const menuData = await getPrimaryMenu();
  const data = await getPostAndMorePosts(params.slug, preview, previewData);

  return {
    props: {
      menuData,
      preview,
      post: data.post,
      posts: data.posts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
}
