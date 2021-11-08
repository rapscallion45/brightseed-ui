import parse from 'html-react-parser';

export default function PostTitle({ children }) {
  return (
    <h2 className="text-6xl md:text-6xl font-extrabold tracking-normal leading-tight md:leading-none mb-6 text-left">
      {parse(children)}
    </h2>
  );
}
