import parse from 'html-react-parser';

export default function PostTitle({ children }) {
  return (
    <h2 className="text-6xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-6 text-left">
      {parse(children)}
    </h2>
  );
}
