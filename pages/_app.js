import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';

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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GoogleReCaptchaProvider>
  );
}
