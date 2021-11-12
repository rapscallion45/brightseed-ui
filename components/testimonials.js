import parse from 'html-react-parser';
import { Carousel } from 'react-responsive-carousel';
import ClientLogos from './client-logos';

export default function Testimonials({ items, clientLogos }) {
  return (
    <>
      {items && (
        <section id="testimonials" className="parallax">
          <div className="overlay">
            <ClientLogos logos={clientLogos} />
            <div className="testimonial-container container mx-auto max-w-6xl px-5 grid grid-cols-12">
              <div className="sec-title text-center white wow animated fadeInDown col-span-12">
                <h2>Testimonial</h2>
              </div>
              <div className="col-span-12 lg:col-start-3 lg:col-span-8">
                <div id="testimonial" className="wow animated fadeInUp">
                  <Carousel
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    autoPlay
                    interval={6000}
                    infiniteLoop
                  >
                    {items.map((item) => {
                      const {
                        content, title, clientDetails, featuredImage,
                      } = item;
                      const {
                        clientName,
                        clientPosition,
                        clientCompany,
                        clientUrl,
                      } = clientDetails;
                      const {
                        sourceUrl, sizes, srcSet, altText,
                      } = featuredImage.node;

                      return (
                        <div
                          key={item.id}
                          className="testimonial-item text-center"
                        >
                          <img
                            width="200"
                            height="200"
                            src={sourceUrl}
                            data-src={sourceUrl}
                            className="attachment-post-thumbnail size-post-thumbnail wp-post-image lazy loaded"
                            alt={altText}
                            loading="lazy"
                            data-srcset={srcSet}
                            data-sizes={sizes}
                            sizes={sizes}
                            srcSet={srcSet}
                            data-was-processed="true"
                          />
                          <div className="clearfix">
                            <span>{clientName}</span>
                            <p className="sub-title">
                              {clientPosition}
                              {' '}
                              -
                              {' '}
                              <a
                                href={clientUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {clientCompany}
                              </a>
                            </p>
                            <h2 className="text-3xl font-bold pb-4">{title}</h2>
                            <p />
                            {parse(content)}
                            <p />
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
