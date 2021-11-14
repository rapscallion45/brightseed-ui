import { useState } from 'react';
import parse from 'html-react-parser';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import RecentWorksIntro from './recent-works-intro';
import RecentWorksOutro from './recent-works-outro';

export default function RecentWorks({ items }) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const getNextSlide = () => {
    if (activeSlideIdx < items.length - 1) {
      setActiveSlideIdx(activeSlideIdx + 1);
    } else {
      setActiveSlideIdx(0);
    }
  };

  const getPrevSlide = () => {
    if (activeSlideIdx > 0) {
      setActiveSlideIdx(activeSlideIdx - 1);
    } else {
      setActiveSlideIdx(items.length - 1);
    }
  };

  const getSlide = (idx) => {
    if (idx >= 0 && idx <= items.length && idx !== activeSlideIdx) setActiveSlideIdx(idx);
  };

  return (
    <>
      {items && (
        <>
          <RecentWorksIntro />
          <section id="recent-works">
            <div className="container mx-auto max-w-6xl grid grid-cols-12">
              <div className="col-span-12 md:col-span-5 lg:col-span-4 recent-works-phone-container px-5">
                <div className="phone-swipe-area wow animated fadeInLeft" />
                {items.slice(activeSlideIdx, activeSlideIdx + 1).map((item) => (
                  <div
                    key={`${item.id}-image`}
                    className="wow animated fadeInLeft"
                  >
                    <img
                      width="374"
                      height="808"
                      src={item.featuredImage.node.sourceUrl}
                      data-src={item.featuredImage.node.sourceUrl}
                      className="attachment-post-thumbnail size-post-thumbnail wp-post-image lazy"
                      alt={item.featuredImage.node.altText}
                      loading="lazy"
                      data-srcset={item.featuredImage.node.srcSet}
                      data-sizes={item.featuredImage.node.sizes}
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-12 lg:col-start-6 lg:col-span-6">
                <div className="recent-works relative">
                  <div className="text-center lg:text-left sec-title wow animated fadeInRight">
                    <h2>Our Recent Works</h2>
                  </div>
                  <div id="works" className="hidden lg:block h-80">
                    {items
                      .slice(activeSlideIdx, activeSlideIdx + 1)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="work-item wow animated fadeInRight"
                        >
                          <a
                            href={item.projectDetails.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h3>{item.title}</h3>
                          </a>
                          <a
                            href={item.projectDetails.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.projectDetails.projectLink}
                          </a>
                          <p />
                          {parse(item.content)}
                          <p />
                        </div>
                      ))}
                  </div>
                  <div
                    id="mobile-works"
                    className="block lg:hidden h-80 mx-auto max-w-xl"
                  >
                    <Carousel
                      showArrows={false}
                      showStatus={false}
                      showThumbs={false}
                      autoPlay
                      interval={6000}
                      infiniteLoop
                    >
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="work-item wow animated fadeInRight"
                        >
                          <a
                            href={item.projectDetails.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h3>{item.title}</h3>
                          </a>
                          <a
                            href={item.projectDetails.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.projectDetails.projectLink}
                          </a>
                          <p />
                          {parse(item.content)}
                          <p />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div
                    id="works-slider-nav"
                    className="nav-dots hidden lg:block"
                  >
                    {items.map((item, idx) => (
                      <span
                        role="button"
                        aria-label={`Slider nav ${idx + 1}`}
                        tabIndex="0"
                        key={`works-nav-button-${item.id}`}
                        onClick={() => getSlide(idx)}
                        onKeyDown={() => getSlide(idx)}
                        className={`${
                          idx === activeSlideIdx ? 'nav-dot-current' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <div className="nav-arrows hidden lg:block">
                    <div
                      className="next z-10 -right-0 -bottom-7 wow animated fadeInRight"
                      role="button"
                      tabIndex="0"
                      aria-label="Slider nav next slide"
                      onClick={getNextSlide}
                      onKeyDown={getNextSlide}
                    >
                      <FaAngleRight size={56} />
                    </div>
                    <div
                      className="prev z-10 -left-0 -bottom-7 wow animated fadeInLeft"
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
              </div>
            </div>
          </section>
          <RecentWorksOutro />
        </>
      )}
    </>
  );
}
