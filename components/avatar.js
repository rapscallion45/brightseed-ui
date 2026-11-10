import BrandText from './brand-text';

export default function Avatar({ author }) {
  return <div className="text-xl font-bold"><BrandText>{author}</BrandText></div>;
}
