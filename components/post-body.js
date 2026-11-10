import styles from './post-body.module.css';

export default function PostBody({ content }) {
  // Only render HTML produced by the sanitized local Markdown pipeline.
  // The page already supplies its h1; imported body headings start at h2.
  const body = content.replace(/<(\/?)h1>/g, '<$1h2>');
  return (
    <div className="max-w-2xl mx-auto">
      {/* eslint-disable-next-line react/no-danger */}
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
