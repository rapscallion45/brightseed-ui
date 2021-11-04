import Link from 'next/link';

export default function ButtonLink({
  variant,
  text,
  children,
  hasIcon,
  uri,
  handleClick,
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
            <i className="btn-icon btn-icon-border">{children}</i>
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
            <i className="btn-icon">{children}</i>
          </button>
        </Link>
      );
  }
}
