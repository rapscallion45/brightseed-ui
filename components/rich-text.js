export default function renderRichText(content) {
  // Homepage HTML is produced by the same sanitized Markdown loader as posts.
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
