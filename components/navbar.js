import Link from "next/link";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function NavBar({ menuItems }) {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleMenuClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const closeMenu = () => {
    setCollapseOpen(false);
  };

  const getMenu = () => {
    return (
      <>
        <div className="text-md lg:flex-grow p-6 leading-6">
          {menuItems.map((menuItem) => {
            return (
              <Link key={menuItem.node.path} href={menuItem.node.path}>
                <a
                  onClick={closeMenu}
                  className="block mt-4 lg:inline-block lg:mt-0 visited:text-white active:text-white hover:text-gray-300 mr-4 text-white"
                >
                  {menuItem.node.label}
                </a>
              </Link>
            );
          })}
        </div>
        <div className="pb-5 lg:pb-0 lg:text-center leading-5">
          <div className="py-2 px-3">
            <Link href="/contact">
              <a
                onClick={closeMenu}
                className="btn btn-border btn-effect btn-border-icon-container external"
              >
                Contact Us
                <i className="btn-icon btn-icon-border btn-icon-nav-contact">
                  <FaEnvelope size={26} />
                </i>
              </a>
            </Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <nav id="navigation" className="fixed w-screen top-0 z-50">
      <div className="container max-w-7xl mx-auto px-5 flex items-center justify-between flex-wrap bg-teal-500 px-4">
        <div className="flex items-center flex-shrink-0 text-white">
          <h1 className="navbar-brand text-4xl py-5 px-2 leading-6">
            <Link href="/">
              <a onClick={closeMenu}>brightseed.</a>
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
              <a>
                <div class="navbar-toggle navbar-contact">
                  <i class="navbar-contact-icon">
                    <FaEnvelope />
                  </i>
                </div>
              </a>
            </Link>
          </div>
          <button
            className={`hamburger hamburger--squeeze ${
              collapseOpen ? "is-active" : ""
            }`}
            type="button"
            onClick={handleMenuClick}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <div
          id="mobile-menu"
          className={`lg:hidden w-full overflow-scroll block flex-grow lg:flex lg:items-right lg:w-auto transition-height duration-500 ease-in-out ${
            collapseOpen ? "h-96" : "h-px"
          }`}
        >
          {getMenu()}
        </div>
        <div
          id="desktop-menu"
          className="hidden lg:visible w-full overflow-hidden block flex-grow lg:flex lg:items-right lg:w-auto"
        >
          {getMenu()}
        </div>
      </div>
    </nav>
  );
}
