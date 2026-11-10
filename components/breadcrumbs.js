import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="agency-breadcrumbs agency-container">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index === items.length - 1
              ? <span aria-current="page">{item.label}</span>
              : <Link href={item.path}>{item.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
