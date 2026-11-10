import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { SectionHeading } from './agency-shared';
import { BrandName } from './brand-text';

export default function ContactDetails({ title = 'What would you like to build or improve?' }) {
  return (
    <section className="agency-section agency-contact" id="contact">
      <div className="agency-container">
        <SectionHeading eyebrow="Contact" title={title}>Tell us about your business, the problem you want to solve and any timing or budget you have in mind.</SectionHeading>
        <div className="agency-center">
          <Link href="/contact" className="agency-button agency-button-pill">
            <span>
              Contact
              {' '}
              <BrandName />
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
