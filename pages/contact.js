import Layout from '../components/layout';
import PageSeo from '../components/page-seo';
import ContactForm from '../components/contact-form';
import { PageHeading } from '../components/agency-shared';

export default function Contact() {
  return (
    <Layout>
      <PageSeo title="Discuss Your Website, Web App or AI Project" description="Tell brightseed about your business, the problem you want to solve and your project plans. Contact us about website, web app and AI development." path="/contact" />
      <PageHeading eyebrow="Let’s work together" title="Tell us about your project">A new website, a custom application or a practical AI feature. Start with what you want to improve.</PageHeading>
      <section className="agency-section agency-contact" id="contact">
        <div className="agency-container">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
