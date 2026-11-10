import { useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { projectLabel } from '../lib/agency';

export default function AgencyPortfolio({ projects, limit }) {
  const [category, setCategory] = useState('All');
  const [showAll, setShowAll] = useState(!limit);
  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const filtered = projects.filter((project) => category === 'All' || project.category === category);
  const visible = showAll || category !== 'All' ? filtered : filtered.slice(0, limit);
  return (
    <>
      <div className="agency-filters" aria-label="Filter projects">
        {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <div className="agency-portfolio-grid">
        {visible.map((project) => (
          <article key={project.id} className="agency-project">
            <Link className={`agency-project-art project-${projects.indexOf(project) % 4}`} href={`/portfolio/${project.slug}`} aria-label={`Read about ${project.title}`}>
              <div className="agency-project-art-caption">
                <span>{project.category}</span>
                <strong>{projectLabel(project)}</strong>
                <FiArrowUpRight aria-hidden="true" />
              </div>
              <img src={project.image.sourceUrl} width="400" height="808" alt={project.image.altText} loading="lazy" />
            </Link>
            <h3><Link href={`/portfolio/${project.slug}`}>{project.title}</Link></h3>
            <p>{project.projectDetails.fullDescription}</p>
          </article>
        ))}
      </div>
      {!showAll && category === 'All' && projects.length > limit && (
      <div className="agency-center">
        <button className="agency-button agency-button-outline" type="button" onClick={() => setShowAll(true)}>
          View All Projects
          <FiArrowUpRight aria-hidden="true" />
        </button>
      </div>
      )}
    </>
  );
}
