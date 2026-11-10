import { AnimatePresence } from 'framer-motion';
import '../styles/index.scss';
import '../styles/agency.scss';

export default function MyApp({ Component, pageProps, router }) {
  const routeKey = router.asPath.split('#')[0];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} key={routeKey} />
    </AnimatePresence>
  );
}
