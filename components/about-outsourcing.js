import Link from 'next/link';
import { BrandName } from './brand-text';

export default function AboutOutsourcing() {
  return (
    <section className="agency-outsourcing agency-blue-gradient" aria-label="Our approach to outsourcing">
      <div className="agency-container">
        <div className="agency-outsourcing-copy">
          <p>
            <BrandName />
            . is a Web, Mobile App and AI Development Company, helping businesses worldwide turn
            ideas into useful digital products. We make outsourcing straightforward through clear
            communication, technical expertise and a collaborative process. From websites and apps
            to practical AI integrations, we focus on solutions that
            support your business goals.
          </p>
          <blockquote>
            <p>
              <em>“Outsourcing has been synonymous with headaches and badly designed software…”</em>
            </p>
          </blockquote>
          <p className="agency-outsourcing-promise">
            {'This ends with '}
            <Link href="/">
              <BrandName />
              .
            </Link>
          </p>
          <p>
            {'At '}
            <BrandName />
            , we combine creative thinking with practical engineering to build websites, mobile
            apps and AI solutions around your business. We handle the technical complexity and
            keep you involved at every stage, so you can focus on your customers and the goals
            that matter most.
          </p>
        </div>
      </div>
    </section>
  );
}
