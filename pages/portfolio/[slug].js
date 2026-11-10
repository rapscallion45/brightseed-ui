import Link from 'next/link';
import Layout from '../../components/layout';
import PageSeo from '../../components/page-seo';
import Breadcrumbs from '../../components/breadcrumbs';
import { PageHeading } from '../../components/agency-shared';
import ContactDetails from '../../components/contact-details';
import { getHomepage } from '../../lib/content.mjs';
import { breadcrumbSchema } from '../../lib/seo.mjs';
import BrandText, { BrandName } from '../../components/brand-text';

export default function Project({ project }) {
  const crumbs = [{ label: 'Home', path: '/' }, { label: 'Work', path: '/portfolio' }, { label: project.title, path: `/portfolio/${project.slug}` }];
  return (
    <Layout>
      <PageSeo title={project.title} description={project.projectDetails.fullDescription} path={`/portfolio/${project.slug}`} structuredData={[breadcrumbSchema(crumbs)]} />
      <PageHeading eyebrow="Selected work" title={project.title}>{project.projectDetails.fullDescription}</PageHeading>
      <Breadcrumbs items={crumbs} />
      <article className="agency-prose agency-detail-prose">
        <figure className="agency-case-image">
          <img src={project.image.sourceUrl} alt={project.image.altText} width="400" height="808" />
          <figcaption>
            Project screenshot
            {project.projectDetails.yearCompleted ? ` · ${project.projectDetails.yearCompleted}` : ''}
            . The current external site may have changed since this work.
          </figcaption>
        </figure>
        <h2>The brief</h2>
        <p><BrandText>{project.caseStudy.brief}</BrandText></p>
        <h2>
          <BrandName />
          ’s work
        </h2>
        <p><BrandText>{project.caseStudy.work}</BrandText></p>
        <h2>What was delivered</h2>
        <ul>
          {project.caseStudy.delivered.map((item) => (
            <li key={item}><BrandText>{item}</BrandText></li>
          ))}
        </ul>
        <h2>Technology</h2>
        <p>{project.projectDetails.technologiesUsed}</p>
        <p>
          <Link href={`/services/${project.caseStudy.service}`}>Explore the related development service</Link>
          {' '}
          or
          {' '}
          <a href={project.projectDetails.projectLink} target="_blank" rel="noopener noreferrer">visit the project website</a>
          .
        </p>
      </article>
      <ContactDetails title="Planning a similar project?" />
    </Layout>
  );
}
export function getStaticPaths() {
  return {
    paths: getHomepage().projects.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}
export function getStaticProps({ params }) {
  const project = getHomepage().projects.find((item) => item.slug === params.slug);
  return project ? { props: { project } } : { notFound: true };
}
