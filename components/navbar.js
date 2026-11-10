import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FiArrowRight, FiMenu, FiSearch, FiX,
} from 'react-icons/fi';
import { Brand } from './agency-shared';
import { BrandName } from './brand-text';

const links = [
  ['About', '/about'], ['Services', '/services'],
  ['Work', '/portfolio'], ['Insights', '/blog'],
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef(null);
  const search = useRef(null);
  const router = useRouter();
  const close = () => { setOpen(false); setSearchOpen(false); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onClick = (event) => { if (!header.current?.contains(event.target)) close(); };
    const onKey = (event) => { if (event.key === 'Escape') close(); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerdown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);
  useEffect(() => { if (searchOpen) search.current?.focus(); }, [searchOpen]);
  useEffect(() => { close(); }, [router.asPath]);

  return (
    <header id="navigation" ref={header} className={`agency-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="agency-container agency-header-inner">
        <Brand />
        <button className="agency-menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={`agency-navigation ${open ? 'is-open' : ''}`}>
          {links.map(([label, href]) => (
            <Link href={href} key={label} onClick={close}>{label}</Link>
          ))}
          <Link href="/contact" className="agency-mobile-quote agency-button" onClick={close}>Get A Quote</Link>
        </nav>
        <div className="agency-header-actions">
          <button className="agency-search-toggle" type="button" aria-label="Search articles" aria-expanded={searchOpen} aria-controls="header-search" onClick={() => setSearchOpen(!searchOpen)}><FiSearch /></button>
          <Link href="/contact" className="agency-button agency-button-pill">Get A Quote</Link>
        </div>
        {searchOpen && (
          <form id="header-search" className="agency-search-popover" action="/blog" method="get">
            <label htmlFor="site-search">
              Search the
              {' '}
              <BrandName />
              {' '}
              blog
              <input id="site-search" name="q" type="search" placeholder="What are you looking for?" ref={search} required />
            </label>
            <div>
              <button type="submit" aria-label="Submit search"><FiArrowRight /></button>
            </div>
          </form>
        )}
      </div>
    </header>
  );
}
