import { motion } from 'framer-motion';
import NavBar from './navbar';
import Footer from './footer';
import Meta from './meta';

const variants = {
  hidden: { opacity: 0, x: +600, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="agency-shell">
        <a href="#main-content" className="agency-skip-link">Skip to content</a>
        <NavBar />
        <motion.main
          id="main-content"
          role="main"
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'tween', ease: 'linear' }}
          onAnimationComplete={(animation) => {
            // Cross-page anchors must scroll after the incoming page is mounted.
            if (animation === 'enter' && window.location.hash) {
              const target = document.getElementById(window.location.hash.slice(1));
              target?.scrollIntoView();
            }
          }}
          className="agency-main"
        >
          {children}
          <Footer />
        </motion.main>
      </div>
    </>
  );
}
