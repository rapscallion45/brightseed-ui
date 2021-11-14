import Link from 'next/link';

export default function ButtonLink({
  variant,
  text,
  children,
  hasIcon,
  uri,
  handleClick,
  noPulse,
}) {
  switch (variant) {
    case 'border':
      return (
        <Link href={uri}>
          <button
            type="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            className={`btn btn-border btn-effect external ${
              hasIcon ? 'btn-border-icon-container' : ''
            }`}
          >
            {text}
            <i className="btn-icon btn-icon-border">
              {!noPulse && (
                <span className="animate-ping absolute left-0 inline-flex h-full w-full rounded-full bg-white" />
              )}
              {children}
            </i>
          </button>
        </Link>
      );
    case 'secondary':
    default:
      return (
        <Link href={uri}>
          <button
            type="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            className={`btn btn-secondary btn-effect external ${
              hasIcon ? 'btn-icon-container-main' : ''
            }`}
          >
            {text}
            <i className="btn-icon">
              {!noPulse && (
                <span className="animate-ping absolute left-0 inline-flex h-full w-full rounded-full bg-white" />
              )}
              {children}
            </i>
          </button>
        </Link>
      );
  }
}
