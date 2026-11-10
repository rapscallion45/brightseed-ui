import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import BrandText from './brand-text';

export function Brand() {
  return (
    <Link href="/" className="agency-brand" aria-label="brightseed home">
      <img src="/design/agency/brightseed-logo-questrial.png" width="1040" height="226" alt="brightseed" />
    </Link>
  );
}

export function SocialLinks() {
  return (
    <div className="agency-socials">
      <a href="https://www.facebook.com/brightseed.io" aria-label="brightseed on Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
      <a href="https://www.instagram.com/brightseed.io/" aria-label="brightseed on Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://www.linkedin.com/company/brightseed-io/" aria-label="brightseed on LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
    </div>
  );
}

export function SectionHeading({
  eyebrow, title, children, align = 'center',
}) {
  return (
    <div className={`agency-section-heading ${align === 'left' ? 'is-left' : ''}`}>
      {eyebrow && <span className="agency-eyebrow"><BrandText>{eyebrow}</BrandText></span>}
      <h2><BrandText>{title}</BrandText></h2>
      {children && <p><BrandText>{children}</BrandText></p>}
    </div>
  );
}

export function PageHeading({ eyebrow, title, children }) {
  return (
    <header className="agency-page-heading">
      <div className="agency-container">
        <span className="agency-eyebrow"><BrandText>{eyebrow}</BrandText></span>
        <h1><BrandText>{title}</BrandText></h1>
        {children && <p><BrandText>{children}</BrandText></p>}
      </div>
    </header>
  );
}

export function BlogCard({ post }) {
  return (
    <article className="agency-blog-card">
      <Link href={`/posts/${post.slug}`} className="agency-card-image" tabIndex={-1} aria-hidden="true">
        {post.coverImage && <img src={post.coverImage} alt="" width="800" height="500" loading="lazy" />}
      </Link>
      <div className="agency-card-body">
        <span className="agency-card-meta">{post.categories[0] || 'Insights'}</span>
        <h3><Link href={`/posts/${post.slug}`}><BrandText>{post.title}</BrandText></Link></h3>
        <p><BrandText>{post.excerpt}</BrandText></p>
        <Link href={`/posts/${post.slug}`} className="agency-text-link">
          Read More
          {' '}
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
