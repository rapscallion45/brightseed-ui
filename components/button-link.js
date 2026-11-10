import Link from 'next/link';

export default function ButtonLink({
  variant, text, children, hasIcon, uri, handleClick, noPulse,
}) {
  const border = variant === 'border';
  const iconClass = border ? 'btn-border-icon-container' : 'btn-icon-container-main';
  return (
    <Link
      href={uri}
      onClick={handleClick}
      className={`btn ${border ? 'btn-border' : 'btn-secondary'} btn-effect external ${hasIcon ? iconClass : ''}`}
    >
      {text}
      {hasIcon && (
        <i className={`btn-icon ${border ? 'btn-icon-border' : ''}`} aria-hidden="true">
          {!noPulse && <span className="animate-ping absolute left-0 inline-flex h-full w-full rounded-full bg-white" />}
          {children}
        </i>
      )}
    </Link>
  );
}
