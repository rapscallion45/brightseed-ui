import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';
import PageSeo from '../../components/page-seo';
import { PageHeading } from '../../components/agency-shared';
import ContactDetails from '../../components/contact-details';
import { services } from '../../lib/services.mjs';

export default function Services() {
  return (
    <Layout>
      <PageSeo title="Website, Web App & AI Development Services" path="/services" description="Explore brightseed’s website design, custom web application and AI integration services. Start with your business goals and a clear project scope." />
      <PageHeading eyebrow="Services" title="What would you like to build?">Start with the problem you want to solve. We’ll help you choose an approach and plan a useful first release.</PageHeading>
      <div className="agency-container agency-section">
        {services.map((service) => (
          <section key={service.id} id={service.id} className="agency-service-detail">
            <Image src={service.image} alt="" width={service.imageWidth} height={service.imageHeight} sizes="(max-width: 767px) 100vw, (max-width: 1320px) 50vw, 625px" />
            <div>
              <h2>{service.title}</h2>
              <p>{service.intro}</p>
              <Link className="agency-button" href={`/services/${service.id}`}>
                Explore Service
              </Link>
            </div>
          </section>
        ))}
      </div>
      <ContactDetails />
    </Layout>
  );
}
