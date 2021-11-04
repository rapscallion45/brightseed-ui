import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

export default function NavBar({ menuItems }) {
  return (
    <nav id="navigation" className="fixed w-screen top-0 z-50">
      <div className="container max-w-7xl mx-auto px-5 flex items-center justify-between flex-wrap bg-teal-500 px-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <h1 className="navbar-brand text-4xl p-5 leading-6">
            <Link href="/">brightseed.</Link>
          </h1>
          <a
            className="navbar-contact-link"
            href="mailto:contact@brightseed.io"
          >
            <p className="navbar-contact-link-text">contact@brightseed.io</p>
          </a>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded  border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
          <div className="text-md lg:flex-grow p-6 leading-6">
            {menuItems.map((menuItem) => {
              return (
                <Link key={menuItem.node.path} href={menuItem.node.path}>
                  <a className="block mt-4 lg:inline-block lg:mt-0 visited:text-white active:text-white hover:text-gray-300 mr-4 text-white">
                    {menuItem.node.label}
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="pb-5 lg:pb-0 lg:text-center leading-5">
            <div className="py-2">
              <Link href="/contact">
                <a
                  data-scroll=""
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
        </div>
      </div>
    </nav>
  );
}
