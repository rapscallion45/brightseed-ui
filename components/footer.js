import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="post-footer-bar">
        <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3">
          <div
            className="flex-row
                       col-span-2
                       md:col-span-1
                       post-footer-bar-left
                       text-center
                       md:text-right"
          >
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
          <div className="flex-row col-span-2 md:col-span-2 md:col-start-2 text-center">
            <p>
              {'Copyright '}
              &copy;
              {` ${new Date().getFullYear()} `}
              <Link href="/">
                <span
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'questrial regular,sans-serif',
                  }}
                >
                  brightseed.
                </span>
              </Link>
              {' All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
