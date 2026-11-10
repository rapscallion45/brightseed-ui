import { useRef, useState } from 'react';
import Link from 'next/link';
import { CONTACT_ACCESS_KEY, WEB3FORMS_ENDPOINT, sendContact } from '../lib/forms.mjs';
import { CONTACT_EMAIL } from '../lib/site';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const sending = useRef(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('botcheck')) return;
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
        <button type="submit" className="agency-button">{status === 'sending' ? 'Sending…' : 'Send Message'}</button>
      </fieldset>
      <div className={`agency-form-status is-${status}`} role="status" aria-live="polite" aria-atomic="true">
        {status === 'success' && 'Thanks — your message has been sent. We’ll get back to you by email.'}
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
