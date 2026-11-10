import Link from 'next/link';
import Image from 'next/image';
import {
  FiArrowRight, FiArrowUpRight, FiCheck,
} from 'react-icons/fi';
import { services, clientName } from '../lib/agency';
import { BlogCard, SectionHeading, SocialLinks } from './agency-shared';
import AgencyPortfolio from './agency-portfolio';
import ContactDetails from './contact-details';
import AgencyTestimonials from './agency-testimonials';
import { BrandName } from './brand-text';
import RecentWorksIntro from './recent-works-intro';

const steps = [
  { title: 'Understand', text: 'Your goals, our starting point', image: '/media/uploads/2020/08/analysis.png' },
  { title: 'Design', text: 'Thoughtful, useful experiences', image: '/media/uploads/2020/08/uidesign.png' },
  { title: 'Develop', text: 'Built to grow with you', image: '/media/uploads/2020/08/webmobile.png' },
  { title: 'Support', text: 'A partner for the long term', image: '/media/uploads/2020/08/support.png' },
];

export default function AgencyHome({ homepage, posts }) {
  return (
    <>
      <section id="home-slider" className="agency-hero">
        <div className="agency-container agency-hero-grid">
          <div className="agency-hero-copy">
            <h1>
              Websites, web apps and AI
              <br className="agency-desktop-break" />
              {' '}
              built around your business.
            </h1>
            <p>
              We help businesses turn ideas into useful digital products. From a new website to a
              custom application or AI integration, we build around your goals and the people
              who will use it.
            </p>
            <div className="agency-hero-actions">
              <Link href="/contact" className="agency-button">Discuss Your Project</Link>
              <Link href="/portfolio" className="agency-secondary-link">
                Explore Our Work
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="agency-trusted">
              <p>
                Trusted by our clients
                <span />
              </p>
              <div>{homepage.clients.slice(0, 3).map((client) => <img key={client.id} src={client.image.sourceUrl} alt={clientName(client)} width="160" height="64" />)}</div>
            </div>
          </div>
          <div className="agency-hero-art">
            <span className="agency-dot-pattern" aria-hidden="true" />
            <img src="/design/agency/hero.png" width="491" height="515" alt="Developer working on a laptop" fetchPriority="high" />
          </div>
        </div>
      </section>
      <section id="introduction" className="agency-about agency-blue-gradient">
        <div className="agency-container agency-about-grid">
          <div>
            <span className="agency-eyebrow">About Us</span>
            <h2>
              A digital partner
              <br />
              from idea to launch.
            </h2>
            <p>
              <BrandName />
              {' brings design and development together to solve practical business '}
              problems. We build websites, custom web applications and AI solutions.
            </p>
          </div>
          <div>
            <h3>Built around your goals</h3>
            <p>
              We help you define what you need, choose an approach and create a product that works
              for your customers and your team. Start with the problem you want to solve;
              we’ll help you plan the next step.
            </p>
            <Link href="/about" className="agency-text-link">
              <span>
                About
                {' '}
                <BrandName />
              </span>
              <FiArrowRight aria-hidden="true" />
            </Link>
            <SocialLinks />
          </div>
        </div>
        <span className="agency-about-orb" aria-hidden="true" />
      </section>
      <section id="how-we-work" className="agency-services agency-section">
        <div className="agency-container">
          <div className="agency-split-heading">
            <SectionHeading eyebrow="What We Do" title="Websites, applications and practical AI" align="left" />
            <Link href="/services" className="agency-uppercase-link">
              Explore Services
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="agency-three-grid">
            {services.map((service) => (
              <article key={service.id} className="agency-service-card">
                <Link href={`/services/${service.id}`} className="agency-card-image" tabIndex={-1} aria-hidden="true">
                  <Image src={service.image} alt="" width={service.imageWidth} height={service.imageHeight} sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1320px) 33vw, 408px" />
                </Link>
                <div className="agency-card-body">
                  <h3><Link href={`/services/${service.id}`}>{service.title}</Link></h3>
                  <p>{service.description}</p>
                  <Link href={`/services/${service.id}`} className="agency-text-link">
                    View Details
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <RecentWorksIntro />
      <section id="recent-works" className="agency-section agency-portfolio">
        <div className="agency-container">
          <SectionHeading eyebrow="Selected Work" title="Websites and apps we’ve built">Explore the brief, the work and the technology behind selected projects.</SectionHeading>
          <AgencyPortfolio projects={homepage.projects} />
        </div>
      </section>
      <section id="clients" className="agency-clients">
        <div className="agency-container">
          <SectionHeading title="Clients we’ve worked with">
            From growing businesses to established organisations.
            <br />
            Good things happen when we work together.
          </SectionHeading>
          <div className="agency-client-grid">{homepage.clients.map((client) => <img key={client.id} src={client.image.sourceUrl} alt={clientName(client)} width="160" height="80" loading="lazy" />)}</div>
        </div>
      </section>
      <div className="agency-container agency-banner-wrap">
        <section className="agency-banner">
          <h2>
            What would you like
            <br />
            to build or improve?
          </h2>
          <Link className="agency-button agency-button-white agency-button-pill" href="/contact">
            Discuss Your Project
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      </div>
      <section className="agency-section agency-process">
        <div className="agency-container">
          <SectionHeading eyebrow="How We Work" title="From Idea to Launch">We start with your goals, agree the scope, and build in stages so you can review progress and shape the result.</SectionHeading>
          <div className="agency-process-grid">
            {steps.map((step, index) => (
              <article className="agency-process-card" key={step.title}>
                <span className="agency-step-number">
                  0
                  {index + 1}
                </span>
                <img src={step.image} alt="" width="128" height="128" loading="lazy" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="price" className="agency-section agency-pricing">
        <div className="agency-container">
          <SectionHeading eyebrow="Project Options" title="Ways to work together">Every project is different. Choose a way of working that fits your goals, your team and your budget.</SectionHeading>
          <div className="agency-three-grid">
            {homepage.pricing.map((plan, index) => (
              <article key={plan.id} className={`agency-price-card ${index === 1 ? 'is-featured' : ''}`}>
                <span className="agency-dot-pattern" aria-hidden="true" />
                <span className="agency-eyebrow">{plan.title}</span>
                <h3>{['Your team', 'Your pace', 'Your project'][index]}</h3>
                <p>{plan.priceDetails.detailOne}</p>
                <hr />
                <ul>
                  {[plan.priceDetails.detailTwo, plan.priceDetails.detailThree, 'A clear scope and transparent communication', 'A quote tailored to your requirements'].map((detail) => (
                    <li key={detail}>
                      <FiCheck aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`agency-button ${index === 1 ? '' : 'agency-button-outline'}`}>{plan.priceDetails.priceLinkText}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="testimonials" className="agency-section agency-testimonials">
        <div className="agency-container">
          <SectionHeading eyebrow="Testimonials" title="What our clients say">The best part of what we do? Building lasting relationships with the people behind the projects.</SectionHeading>
          <AgencyTestimonials items={homepage.testimonials} />
        </div>
      </section>
      <section id="news" className="agency-section agency-news">
        <div className="agency-container">
          <SectionHeading eyebrow="Blog" title="Ideas for your next digital project">Practical notes on planning, building and improving websites, applications and AI features.</SectionHeading>
          <div className="agency-three-grid">{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
          <div className="agency-center">
            <Link href="/blog" className="agency-text-link">
              Explore The Blog
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <ContactDetails />
    </>
  );
}
