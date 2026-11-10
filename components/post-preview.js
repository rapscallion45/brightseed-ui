import Link from 'next/link';
import Avatar from './avatar';
import Date from './date';
import CoverImage from './cover-image';

export default function PostPreview({
  title, coverImage, date, excerpt, author, slug, smallTitle,
}) {
  return (
    <div>
      {coverImage && (
        <div className="mb-5"><CoverImage title={title} coverImage={coverImage} slug={slug} /></div>
      )}
      <h2 className={`${smallTitle ? 'text-xl' : 'text-3xl'} mb-3 leading-snug font-bold`}>
        <Link href={`/posts/${slug}`} className="hover:underline">{title}</Link>
      </h2>
      <div className="text-lg mb-4"><Date dateString={date} /></div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar author={author} />
    </div>
  );
}
