import Link from 'next/link';
import { useRouter } from 'next/router';
import { SocialLinks } from './agency-shared';
import { CONTACT_EMAIL } from '../lib/site';
import { BrandName } from './brand-text';
import NewsletterSignup from './newsletter-signup';

export default function Footer() {
  const isContactPage = useRouter().pathname === '/contact';
  return (
    <footer className="agency-footer" id="footer">
      <div className="agency-container">
        <NewsletterSignup />
        <div className="agency-footer-grid">
          <div className="agency-footer-contact">
            <h2>Let’s Talk!</h2>
            <h3>Contact Info</h3>
            {isContactPage ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : <Link href="/contact">Get in touch</Link>}
            <p>
              Websites, custom web applications and AI solutions built around your business.
            </p>
          </div>
          <div>
            <h3>What We Do</h3>
            <Link href="/services/website-development">Website development</Link>
            <Link href="/services/web-app-development">Web applications</Link>
            <Link href="/services/ai-development">AI integration</Link>
            <Link href="/services">All Services</Link>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/about">
              About
              {' '}
              <BrandName />
            </Link>
            <Link href="/portfolio">Selected work</Link>
            <Link href="/blog">Latest Insights</Link>
            <Link href="/#testimonials">Our Clients</Link>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link href="/contact">Get in Touch</Link>
            <Link href="/#price">Ways to work together</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
        <div className="agency-footer-bottom">
          <SocialLinks />
          <p>
            <BrandName />
            {' — Websites, web apps and AI. ©'}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
