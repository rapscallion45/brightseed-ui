import ContactBanner from './contact-banner';
import MoreArticles from './more-articles';

export default function PostFooter({ morePosts }) {
  return (
    <>
      <ContactBanner />
      {morePosts.length > 0 && <MoreArticles posts={morePosts} />}
    </>
  );
}
