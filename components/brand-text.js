export function BrandName() {
  return <span className="brand-name">brightseed</span>;
}

export default function BrandText({ children }) {
  if (typeof children !== 'string') return children;
  return children.split(/(\bbrightseed\b)/gi).map((part, index) => (
    // Segments are derived from one immutable string, with no independent state.
    // eslint-disable-next-line react/no-array-index-key
    index % 2 ? <BrandName key={index} /> : part
  ));
}
