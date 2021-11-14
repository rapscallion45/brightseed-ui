import { motion } from 'framer-motion';
import Alert from './alert';
import NavBar from './navbar';
import Footer from './footer';
import Meta from './meta';

const variants = {
  hidden: { opacity: 0, x: +600, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Layout({ navMenuItems, preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen overflow-hidden">
        <Alert preview={preview} />
        <NavBar menuItems={navMenuItems} />
        <motion.main
          role="main"
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'linear' }}
          className="site-content"
        >
          {children}
        </motion.main>
      </div>
      <Footer navItems={navMenuItems} />
    </>
  );
}
