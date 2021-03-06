import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaAngleRight, FaEnvelope } from 'react-icons/fa';
import ButtonLink from './button-link';

export default function NavBar({ menuItems }) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const navClickRef = useRef();

  const handleClick = (event) => {
    if (!navClickRef.current.contains(event.target)) {
      /* user click away from nav, close */
      setCollapseOpen(false);
    }
  };
  useEffect(() => {
    /* add click handler when mounted */
    document.addEventListener('mousedown', handleClick);

    /* return function to remove click handler when unmounted */
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleMenuClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const closeMenu = () => {
    setCollapseOpen(false);
  };

  const getMenu = () => (
    <>
      <div className="text-md lg:flex lg:flex-grow lg:justify-end p-6 leading-6">
        {menuItems.slice(0, -1).map((menuItem) => (
          <Link key={menuItem.node.path} href={menuItem.node.path}>
            <button
              type="button"
              onKeyDown={closeMenu}
              onClick={closeMenu}
              className="block mt-4 lg:inline-block lg:mt-0 visited:text-white active:text-white hover:text-gray-300 mr-4 text-white"
            >
              {menuItem.node.label}
            </button>
          </Link>
        ))}
      </div>
      <div className="pb-5 lg:pb-0 lg:text-center leading-5">
        <div className="py-2 px-3">
          {menuItems.slice(-1).map((menuItem) => (
            <ButtonLink
              key={menuItem.node.path}
              uri={menuItem.node.path}
              variant="border"
              text={menuItem.node.label}
              hasIcon
              handleClick={closeMenu}
              noPulse
            >
              <FaAngleRight />
            </ButtonLink>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <nav
      ref={navClickRef}
      id="navigation"
      className="fixed w-screen top-0 z-50"
    >
      <div className="container max-w-7xl mx-auto px-5 flex items-center justify-between flex-wrap bg-teal-500 px-4">
        <div className="flex items-center flex-shrink-0 text-white">
          <h1 className="navbar-brand text-4xl py-5 px-2 leading-6 my-0 mr-2">
            <Link href="/">
              <button type="button" onKeyDown={closeMenu} onClick={closeMenu}>
                brightseed.
              </button>
            </Link>
          </h1>
          <a
            className="navbar-contact-link"
            href="mailto:contact@brightseed.io"
          >
            <p className="navbar-contact-link-text">contact@brightseed.io</p>
          </a>
        </div>
        <div className="block flex flex-row lg:hidden">
          <div className="py-3">
            <Link href="/contact">
              <button type="button" onKeyDown={closeMenu} onClick={closeMenu}>
                <div className="navbar-toggle navbar-contact">
                  <i className="navbar-contact-icon">
                    <FaEnvelope />
                  </i>
                </div>
              </button>
            </Link>
          </div>
          <button
            className={`hamburger hamburger--squeeze ${
              collapseOpen ? 'is-active' : ''
            }`}
            type="button"
            onClick={handleMenuClick}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
        <div
          id="mobile-menu"
          className={`lg:hidden w-full overflow-scroll block flex-grow lg:flex lg:items-right lg:w-auto transition-height duration-500 ease-in-out ${
            collapseOpen ? 'h-80' : 'h-px'
          }`}
        >
          {menuItems && getMenu()}
        </div>
        <div
          id="desktop-menu"
          className="hidden lg:visible w-full overflow-hidden block flex-grow lg:flex lg:items-right lg:w-auto"
        >
          {menuItems && getMenu()}
        </div>
      </div>
    </nav>
  );
}
