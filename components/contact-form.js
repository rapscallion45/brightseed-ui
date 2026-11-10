import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { CONTACT_ACCESS_KEY, WEB3FORMS_ENDPOINT, sendContact } from '../lib/forms.mjs';
import { CONTACT_EMAIL } from '../lib/site';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const sending = useRef(false);
  const captcha = useRef(null);
  const captchaToken = useRef('');
  const [captchaStatus, setCaptchaStatus] = useState('loading');
  const [captchaAttempt, setCaptchaAttempt] = useState(0);

  useEffect(() => {
    if (!CONTACT_ACCESS_KEY || captchaStatus !== 'loading') return undefined;
    const timeout = setTimeout(() => setCaptchaStatus('error'), 15000);
    return () => clearTimeout(timeout);
  }, [captchaStatus, captchaAttempt]);

  function invalidateCaptcha(nextStatus) {
    captchaToken.current = '';
    setCaptchaStatus(nextStatus);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('botcheck')) return;
    if (!captchaToken.current) {
      if (captchaStatus !== 'error' && captchaStatus !== 'loading') setCaptchaStatus('required');
      return;
    }
    data.set('h-captcha-response', captchaToken.current);
    sending.current = true;
    setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      await sendContact(data, { signal: controller.signal });
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      sending.current = false;
      // Tokens are single-use, including after an uncertain/failed submission.
      invalidateCaptcha('ready');
      captcha.current?.resetCaptcha();
    }
  }

  if (!CONTACT_ACCESS_KEY) return null;

  return (
    <form className="agency-contact-form agency-form" action={WEB3FORMS_ENDPOINT} method="post" onSubmit={handleSubmit} aria-label="Project enquiry" aria-busy={status === 'sending'}>
      <input type="hidden" name="access_key" value={CONTACT_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New project enquiry from the brightseed website" />
      <input type="checkbox" name="botcheck" className="agency-form-trap" tabIndex={-1} aria-hidden="true" autoComplete="off" />
      <fieldset disabled={status === 'sending'}>
        <legend className="agency-form-title">Send us a message</legend>
        <div className="agency-form-row">
          <label htmlFor="contact-name">
            Your name
            <input id="contact-name" name="name" autoComplete="name" required maxLength={120} />
          </label>
          <label htmlFor="contact-email">
            Email address
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} />
          </label>
        </div>
        <label htmlFor="contact-message">
          Tell us about your project
          <textarea id="contact-message" name="message" rows={6} required maxLength={5000} />
        </label>
        <p className="agency-form-note">
          We use your details to respond to your enquiry.
          Sending a message does not subscribe you to our newsletter.
          {' '}
          <Link href="/privacy">Privacy Policy</Link>
          .
        </p>
        <div className="agency-captcha" aria-describedby="contact-captcha-status">
          {/* Web3Forms' documented public site key for its free hCaptcha integration. */}
          <HCaptcha
            key={captchaAttempt}
            ref={captcha}
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            size="compact"
            onReady={() => setCaptchaStatus('ready')}
            onVerify={(token) => { captchaToken.current = token; setCaptchaStatus('verified'); }}
            onExpire={() => invalidateCaptcha('expired')}
            onChalExpired={() => invalidateCaptcha('expired')}
            onError={() => invalidateCaptcha('error')}
          />
          <p id="contact-captcha-status" className="agency-form-note" role="status" aria-live="polite">
            {captchaStatus === 'loading' && 'Loading spam protection…'}
            {captchaStatus === 'ready' && 'Complete the verification before sending your message.'}
            {captchaStatus === 'required' && 'Please complete the verification before sending your message.'}
            {captchaStatus === 'verified' && 'Verification complete.'}
            {captchaStatus === 'expired' && 'Verification expired. Please verify again.'}
            {captchaStatus === 'error' && (
              <>
                Verification could not load. Retry or email
                {' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                .
              </>
            )}
          </p>
          {captchaStatus === 'error' && (
            <button
              type="button"
              className="agency-button agency-button-outline"
              onClick={() => { invalidateCaptcha('loading'); setCaptchaAttempt((attempt) => attempt + 1); }}
            >
              Retry Verification
            </button>
          )}
        </div>
        <noscript>
          Verification requires JavaScript. You can email
          {' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {' '}
          instead.
        </noscript>
        <button type="submit" className="agency-button" disabled={captchaStatus === 'loading' || captchaStatus === 'error'}>{status === 'sending' ? 'Sending…' : 'Send Message'}</button>
      </fieldset>
      <div className={`agency-form-status is-${status}`} role="status" aria-live="polite" aria-atomic="true">
        {status === 'success' && 'Thanks — your message has been sent. We’ll aim to get back to you by email within 48 hours.'}
        {status === 'error' && (
          <>
            We couldn’t confirm your message was sent. Your text is still here; try again or email
            {' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            .
          </>
        )}
      </div>
    </form>
  );
}
