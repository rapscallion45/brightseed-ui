import Link from 'next/link';
import Layout from '../../components/layout';
import PageSeo from '../../components/page-seo';
import Breadcrumbs from '../../components/breadcrumbs';
import { PageHeading, SectionHeading } from '../../components/agency-shared';
import ContactDetails from '../../components/contact-details';
import AgencyPortfolio from '../../components/agency-portfolio';
import { services, getService } from '../../lib/services.mjs';
import { getHomepage, getPostBySlug } from '../../lib/content.mjs';
import { breadcrumbSchema } from '../../lib/seo.mjs';

export default function Service({ service, projects, hasPilotArticle }) {
  const crumbs = [{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }, { label: service.title, path: `/services/${service.id}` }];
  return (
    <Layout>
      <PageSeo title={service.title} description={service.description} path={`/services/${service.id}`} structuredData={[breadcrumbSchema(crumbs)]} />
      <PageHeading eyebrow="Services" title={service.title}>{service.intro}</PageHeading>
      <Breadcrumbs items={crumbs} />
      <article className="agency-prose agency-detail-prose">
        {service.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <h2>What we can include</h2>
        <p>
          We agree the deliverables, responsibilities and acceptance criteria
          with you before work begins.
        </p>
        <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Questions before you start</h2>
        {service.questions.map((item) => (
          <section key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        {service.id === 'ai-development' && hasPilotArticle && (
        <p>
          Explore
          <Link href="/posts/planning-a-useful-ai-pilot">how to plan and evaluate a useful AI pilot</Link>
          {' '}
          before expanding it to more users.
        </p>
        )}
      </article>
      {projects.length > 0 && (
      <section className="agency-section agency-portfolio">
        <div className="agency-container">
          <SectionHeading title="Related work" />
          <AgencyPortfolio projects={projects} />
        </div>
      </section>
      )}
      <ContactDetails />
    </Layout>
  );
}
export function getStaticPaths() {
  return { paths: services.map(({ id }) => ({ params: { slug: id } })), fallback: false };
}
export function getStaticProps({ params }) {
  const service = getService(params.slug);
  if (!service) return { notFound: true };
  return {
    props: {
      service,
      projects: getHomepage().projects
        .filter((project) => service.projectSlugs.includes(project.slug)),
      hasPilotArticle: Boolean(getPostBySlug('planning-a-useful-ai-pilot')),
    },
  };
}
