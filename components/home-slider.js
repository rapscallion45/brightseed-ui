import parse from 'html-react-parser';
import { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import ButtonLink from './button-link';

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
    if (idx >= 0 && idx <= slides.length && idx !== activeSlideIdx) setActiveSlideIdx(idx);
  };

  return (
    <>
      {slides && (
        <section id="home-slider">
          <div className="overflow-hidden">
            {slides.slice(activeSlideIdx, activeSlideIdx + 1).map((slide) => (
              <div id="active-slide" key={slide.slug}>
                <div
                  className="absolute filter brightness-50 z-1 bg-cover bg-center bg-no-repeat bg-img bg-vid-dark height-auto w-full"
                  style={{
                    backgroundImage: `url(${slide.featuredImage?.node.sourceUrl}`,
                  }}
                >
                  <div className="relative h-screen overflow-hidden w-full">
                    <video
                      autoPlay
                      muted
                      loop
                      preload="none"
                      poster={slide.featuredImage?.node.sourceUrl}
                      className="w-auto min-h-full max-w-none min-w-full bg-vid bg-vid-dark overflow-hidden"
                    >
                      <source
                        src={slide.videoLink?.sourceUrl}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
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
                          {parse(slide.excerpt)}
                        </div>
                      </>
                    )}
                    {slide.slug === 'main-slide' && (
                      <>
                        <h1 className="text-2xl md:text-4xl lg:text-7xl xl:text-8xl wow animated brand-text fadeInDown home-title">
                          <a data-scroll="" href="#introduction">
                            {slide.title}
                          </a>
                        </h1>
                        <div className="text-xl md:text-2xl lg:text-3xl text-white py-10 wow animated bounceInRight">
                          {parse(slide.content)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mx-auto py-5 wow animated fadeInUp">
                    <ButtonLink
                      uri={slide.buttonLink?.buttonLink}
                      varaint="secondary"
                      text={slide.buttonLink?.buttonText}
                      hasIcon
                    >
                      <FaAngleRight />
                    </ButtonLink>
                  </div>
                </div>
              </div>
            ))}
            <div id="home-slider-nav" className="nav-dots">
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
                className="next"
                role="button"
                tabIndex="0"
                aria-label="Slider nav next slide"
                onClick={getNextSlide}
                onKeyDown={getNextSlide}
              >
                <FaAngleRight size={56} />
              </div>
              <div
                className="prev"
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
