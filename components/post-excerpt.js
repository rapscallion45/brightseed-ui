import parse from 'html-react-parser';

export default function PostExcerpt({ children }) {
  return (
    <h2 className="mt-4 text-2xl md:text-3xl tracking-normal leading-tight md:leading-none mb-6 text-left">
      {parse(children)}
    </h2>
  );
}
