import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AnimatePresence } from 'framer-motion';
import '../styles/index.scss';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const isServer = typeof window === 'undefined';

  /* eslint-disable global-require */
  const WOW = !isServer ? require('wow.js') : null;

  useEffect(() => {
    new WOW().init();
  });

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </GoogleReCaptchaProvider>
  );
}
