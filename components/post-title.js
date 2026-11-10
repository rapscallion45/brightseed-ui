export default function PostTitle({ children }) {
  return (
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-normal leading-tight mb-6 text-left">
      {children}
    </h1>
  );
}
