import Link from 'next/link';
import {
  FaFacebook, FaInstagram, FaLinkedin, FaTwitter,
} from 'react-icons/fa';

export default function FooterWidgets({ navItems }) {
  return (
    <div className="container grid grid-cols-12 mx-auto px-5 max-w-6xl pb-12">
      <div
        className="footer-content-col-1
                            footer-content-cols
                            md:col-span-5"
      >
        <div className="wow animated fadeInDown">
          <div className="flex flex-row py-5 px-5">
            <h1 className="navbar-brand footer-content-logo m-0 mr-3">
              <Link href="/">
                <button type="button">brightseed.</button>
              </Link>
            </h1>
            <a
              className="navbar-contact-link footer-content-logo footer-content-logo-link py-1"
              href="mailto:contact@brightseed.io"
            >
              <p className="navbar-contact-link-text">contact@brightseed.io</p>
            </a>
          </div>
          <p className="footer-content-slogan">
            Software outsourcing starts here.
          </p>
          <div
            id="footer-1-widget-area"
            className="footer-widget-area widget-area"
            role="complementary"
          >
            <p>
              Custom web and mobile app development company, making the
              outsourcing experience easy for businesses worldwide.
            </p>
          </div>
        </div>
      </div>
      <div
        className="footer-content-col-2
                                footer-content-cols
                                md:col-span-2 md:col-start-7"
      >
        <div className="wow animated fadeInDown">
          <div
            id="footer-2-widget-area"
            className="footer-widget-area widget-area"
            role="complementary"
          >
            <div id="nav_menu-3" className="widget widget_nav_menu">
              <p className="footer-content-title">Links</p>
              <div className="menu-top-menu-container">
                <ul id="menu-top-menu-1" className="menu">
                  {navItems.map((navItem) => (
                    <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-5">
                      <Link href={navItem.node.path}>
                        <button type="button">{navItem.node.label}</button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-content-col-3 footer-content-cols col-span-12 md:col-start-3 md:col-span-8 lg:col-start-9 lg:col-span-4">
        <div className="wow animated fadeInDown">
          <div
            id="footer-3-widget-area"
            className="footer-widget-area widget-area"
            role="complementary"
          >
            <p className="footer-content-title">Connect With Us</p>
            <p>
              We believe that technology can make a difference, here at
              {' '}
              <span className="brand-text">brightseed.</span>
              {' '}
              Keep updated with
              us below to get all of our latest news.
            </p>
            <div className="footer-social py-10">
              <ul>
                <li className="wow animated zoomIn">
                  <a
                    href="https://www.facebook.com/brightseed.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={46} />
                  </a>
                </li>
                <li className="wow animated zoomIn" data-wow-delay="0.3s">
                  <a
                    href="https://www.instagram.com/brightseed.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={46} />
                  </a>
                </li>
                <li className="wow animated zoomIn" data-wow-delay="0.6s">
                  <a
                    href="https://twitter.com/brightseed_io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={46} />
                  </a>
                </li>
                <li className="wow animated zoomIn" data-wow-delay="0.9s">
                  <a
                    href="https://www.linkedin.com/company/brightseed-io/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={46} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
