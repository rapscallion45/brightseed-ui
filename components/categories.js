export default function Categories({ categories }) {
  if (!categories.length) return null;
  return <p className="mb-4">{categories.join(' · ')}</p>;
}
