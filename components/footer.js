import Link from 'next/link';
import FooterWidgets from './footer-widgets';

export default function Footer({ navItems }) {
  return (
    <footer id="footer">
      <FooterWidgets navItems={navItems} />
      <div className="post-footer-bar">
        <div className="container mx-auto px-5 grid grid-cols-12">
          <div
            className="flex-row
                       col-span-12
                       md:col-start-2
                       md:col-span-4
                       post-footer-bar-left
                       text-center"
          >
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
          <div className="flex-row col-span-12 md:col-span-6 md:col-start-7 text-center">
            <p>
              {'Copyright '}
              &copy;
              {` ${new Date().getFullYear()} `}
              <Link href="/">
                <button type="button">
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontFamily: 'questrial regular,sans-serif',
                    }}
                  >
                    brightseed.
                  </span>
                </button>
              </Link>
              {' All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
