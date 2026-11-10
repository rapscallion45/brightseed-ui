import { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import renderRichText from './rich-text';
import ButtonScroll from './button-scroll';
import ButtonLink from './button-link';

function SlideVideo({ slide }) {
  const [playing, setPlaying] = useState(false);
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={slide.image.sourceUrl}
      className="slide-video"
      style={{ opacity: playing ? 1 : 0 }}
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
      aria-hidden="true"
    >
      <source src={slide.videoLink?.sourceUrl} type="video/mp4" />
    </video>
  );
}

export default function HomeSlider({ slides }) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const getNextSlide = () => {
    if (activeSlideIdx < slides.length - 1) {
      setActiveSlideIdx(activeSlideIdx + 1);
    } else {
      setActiveSlideIdx(0);
    }
  };

  const getPrevSlide = () => {
    if (activeSlideIdx > 0) {
      setActiveSlideIdx(activeSlideIdx - 1);
    } else {
      setActiveSlideIdx(slides.length - 1);
    }
  };

  const getSlide = (idx) => {
    if (idx >= 0 && idx < slides.length && idx !== activeSlideIdx) {
      setActiveSlideIdx(idx);
    }
  };

  return (
    <>
      {slides && (
        <section id="home-slider">
          <div className="overflow-hidden">
            <div className="slide-background" aria-hidden="true">
              {slides.map((slide, idx) => (
                <img
                  key={slide.slug}
                  src={slide.image.sourceUrl}
                  alt=""
                  loading="eager"
                  className="slide-poster"
                  style={{ opacity: idx === activeSlideIdx ? 1 : 0 }}
                />
              ))}
              <SlideVideo key={slides[activeSlideIdx].slug} slide={slides[activeSlideIdx]} />
            </div>
            {slides.slice(activeSlideIdx, activeSlideIdx + 1).map((slide) => (
              <div id="active-slide" key={slide.slug}>
                <div className="relative -top-full mx-auto max-w-4xl flex justify-center flex-col content-center min-h-screen">
                  <div
                    key={slide.id}
                    className="max-w-md lg:max-w-3xl mx-auto px-5 text-center"
                  >
                    {slide.slug !== 'main-slide' && (
                      <>
                        <h2 className="text-2xl md:text-4xl lg:text-6xl text-white leading-tight wow animated bounceInLeft">
                          {slide.title}
                        </h2>
                        <div className="text-xl md:text-2xl lg:text-3xl text-white py-10 wow animated bounceInRight">
                          {renderRichText(slide.excerpt)}
                        </div>
                      </>
                    )}
                    {slide.slug === 'main-slide' && (
                      <>
                        <h1 className="lg:text-7xl xl:text-8xl wow animated brand-text fadeInDown home-title">
                          <a data-scroll="" href="#introduction">
                            {slide.title}
                          </a>
                        </h1>
                        <div className="text-xl md:text-2xl lg:text-3xl text-white py-10 wow animated bounceInRight">
                          {renderRichText(slide.content)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mx-auto py-5 wow animated fadeInUp">
                    {slide.buttonLink?.isAnchor && (
                      <ButtonScroll
                        to={slide.buttonLink?.buttonLink}
                        variant="secondary"
                        text={slide.buttonLink?.buttonText}
                        hasIcon
                      >
                        <FaAngleRight />
                      </ButtonScroll>
                    )}
                    {!slide.buttonLink?.isAnchor && (
                      <ButtonLink
                        uri={slide.buttonLink?.buttonLink}
                        variant="secondary"
                        text={slide.buttonLink?.buttonText}
                        hasIcon
                      >
                        <FaAngleRight />
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div
              id="home-slider-nav"
              className="nav-dots bottom-4 wow animated fadeInUp"
            >
              {slides.map((slide, idx) => (
                <span
                  role="button"
                  aria-label={`Slider nav ${idx + 1}`}
                  tabIndex="0"
                  key={`slider-nav-button-${slide.id}`}
                  onClick={() => getSlide(idx)}
                  onKeyDown={() => getSlide(idx)}
                  className={`${
                    idx === activeSlideIdx ? 'nav-dot-current' : ''
                  }`}
                />
              ))}
            </div>
            <div className="nav-arrows">
              <div
                className="next right-12 top-2/4 wow animated fadeInRight"
                role="button"
                tabIndex="0"
                aria-label="Slider nav next slide"
                onClick={getNextSlide}
                onKeyDown={getNextSlide}
              >
                <FaAngleRight size={56} />
              </div>
              <div
                className="prev left-12 top-2/4 wow animated fadeInLeft"
                role="button"
                tabIndex="0"
                aria-label="Slider nav prev slide"
                onClick={getPrevSlide}
                onKeyDown={getPrevSlide}
              >
                <FaAngleLeft size={56} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
