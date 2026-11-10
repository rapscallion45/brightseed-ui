import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import renderRichText from './rich-text';

export default function AgencyTestimonials({ items }) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const touchStart = useRef(null);
  const rotating = items.length > 1 && !reducedMotion && !hovered && !focused && !touching;
  const move = (direction) => setActive((current) => (
    (current + direction + items.length) % items.length
  ));

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectPreference = () => {
      setReducedMotion(preference.matches);
    };
    respectPreference();
    preference.addEventListener('change', respectPreference);
    return () => preference.removeEventListener('change', respectPreference);
  }, []);

  useEffect(() => {
    if (!rotating) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % items.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [rotating, active, items.length]);

  if (!items.length) return null;

  return (
    <section
      className="agency-testimonial-carousel"
      aria-roledescription="carousel"
      aria-label="Client Testimonials"
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="agency-testimonial-slides"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={(event) => {
          setTouching(true);
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchCancel={() => { touchStart.current = null; setTouching(false); }}
        onTouchEnd={(event) => {
          setTouching(false);
          if (!touchStart.current) return;
          const touch = event.changedTouches[0];
          const deltaX = touch.clientX - touchStart.current.x;
          const deltaY = touch.clientY - touchStart.current.y;
          if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            move(deltaX < 0 ? 1 : -1);
          }
          touchStart.current = null;
        }}
      >
        {items.map((testimonial, index) => (
          <figure
            className={`agency-testimonial-card ${index === active ? 'is-active' : ''}`}
            key={testimonial.id}
            aria-hidden={index !== active}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
          >
            <h3>{testimonial.clientDetails.clientCompany}</h3>
            <blockquote>{renderRichText(testimonial.content)}</blockquote>
            <figcaption>
              <img src={testimonial.image.sourceUrl} alt="" width="48" height="48" loading="lazy" />
              <div>
                <strong>{testimonial.clientDetails.clientName}</strong>
                <span>{testimonial.clientDetails.clientPosition}</span>
              </div>
              <span className="agency-quote-mark" aria-hidden="true">”</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {items.length > 1 && (
        <div className="agency-testimonial-controls">
          <button type="button" className="agency-testimonial-arrow" aria-label="Previous Testimonial" onClick={() => move(-1)}>
            <FiArrowLeft aria-hidden="true" />
          </button>
          <div className="agency-testimonial-dots">
            {items.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Show Testimonial ${index + 1}`}
                aria-current={active === index ? 'true' : undefined}
                onClick={() => setActive(index)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <button type="button" className="agency-testimonial-arrow" aria-label="Next Testimonial" onClick={() => move(1)}>
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
      <p className="sr-only" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
        {`Testimonial ${active + 1} of ${items.length}`}
      </p>
    </section>
  );
}
