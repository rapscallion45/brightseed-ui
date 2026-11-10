import Link from 'next/link';
import { NEWSLETTER_ACTION } from '../lib/forms.mjs';
import BrandText from './brand-text';

export default function NewsletterSignup() {
  if (!NEWSLETTER_ACTION) return null;

  return (
    <section className="agency-newsletter" aria-labelledby="newsletter-title">
      <div>
        <span className="agency-eyebrow"><BrandText>brightseed Notes</BrandText></span>
        <h2 id="newsletter-title">Ideas worth opening</h2>
        <p>Practical notes on websites, web apps and AI, delivered to your inbox.</p>
      </div>
      <form className="agency-form" action={NEWSLETTER_ACTION} method="post" aria-label="Newsletter signup">
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />
        <div className="agency-newsletter-fields">
          <label htmlFor="newsletter-email">
            Email address
            <input id="newsletter-email" name="fields[email]" type="email" autoComplete="email" required maxLength={254} aria-describedby="newsletter-note" />
          </label>
          <button className="agency-button" type="submit">Subscribe</button>
        </div>
        <p id="newsletter-note" className="agency-form-note">
          <BrandText>Subscribe to receive brightseed emails. Unsubscribe at any time.</BrandText>
          {' '}
          <Link href="/privacy">Privacy Policy</Link>
          .
          {' '}
          Continue to MailerLite to complete your signup.
        </p>
      </form>
    </section>
  );
}
