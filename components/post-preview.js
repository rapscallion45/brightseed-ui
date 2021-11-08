import Link from 'next/link';
import parse from 'html-react-parser';
import Avatar from './avatar';
import Date from './date';
import CoverImage from './cover-image';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  smallTitle,
  mainFeatured,
}) {
  const titleTextSize = smallTitle ? 'text-xl' : 'text-3xl';
  return (
    <div>
      <div className="mb-5">
        {coverImage && !mainFeatured && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
      </div>
      <h3 className={`${titleTextSize} mb-3 leading-snug`}>
        <Link href={`/posts/${slug}`}>
          <button
            aria-label="Post title"
            type="button"
            href="#"
            className={`hover:underline text-left font-extrabold ${
              mainFeatured ? 'text-6xl' : 'text-2xl'
            }`}
          >
            {parse(title)}
          </button>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      {excerpt && (
        <div className="text-lg leading-relaxed mb-4">{parse(excerpt)}</div>
      )}
      <div className="mb-5">
        {coverImage && mainFeatured && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
      </div>
      {author && <Avatar author={author} />}
    </div>
  );
}
