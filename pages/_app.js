import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AnimatePresence } from 'framer-motion';
import '../styles/index.scss';

export default function MyApp({ Component, pageProps }) {
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
