import Layout from '../../components/layout';
import PageSeo from '../../components/page-seo';
import { PageHeading } from '../../components/agency-shared';
import AgencyPortfolio from '../../components/agency-portfolio';
import ContactDetails from '../../components/contact-details';
import { getHomepage } from '../../lib/content.mjs';

export default function Portfolio({ projects }) {
  return (
    <Layout>
      <PageSeo title="Selected Website & Web App Projects" path="/portfolio" description="Explore brightseed’s website and application work, including BugTrakr, FPL Frog, Tacoma Sound, EuroCham Myanmar and Conyat Create." />
      <PageHeading eyebrow="Selected work" title="Websites and applications we’ve built">Explore the brief, the work and the technology behind each project.</PageHeading>
      <section className="agency-container agency-section"><AgencyPortfolio projects={projects} /></section>
      <ContactDetails />
    </Layout>
  );
}
export function getStaticProps() { return { props: { projects: getHomepage().projects } }; }
