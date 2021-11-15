import { Carousel } from 'react-responsive-carousel';

export default function ClientLogos({ logos }) {
  /* construct rows of logos for the desktop carousel, 5 logos per row */
  const rows = [...Array(Math.ceil(logos.length / 5))];
  const logoRows = rows.map((row, idx) => logos.slice(idx * 5, idx * 5 + 5));

  return (
    <>
      {logos && (
        <>
          <div
            id="clients"
            className="container mx-auto pb-10 max-w-6xl px-5 grid grid-cols-10"
          >
            <div className="col-span-10 py-10 text-5xl font-bold text-center white wow animated fadeInDown">
              <h2>Among Our Clients</h2>
            </div>

            <div id="clientLogosMobile" className="col-span-10 block md:hidden">
              <Carousel
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                autoPlay
                interval={4000}
                infiniteLoop
              >
                {logos.map((logo) => {
                  const { altText, sourceUrl } = logo.featuredImage.node;
                  return (
                    <div
                      key={logo.id}
                      className="w-2/4 sm:w-1/3 mx-auto wow animated zoomIn"
                      data-wow-delay="0.3s"
                    >
                      <img
                        className="lazy loaded"
                        src={sourceUrl}
                        data-src={sourceUrl}
                        data-was-processed="true"
                        alt={altText}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div id="clientLogos" className="col-span-10 hidden md:block">
              <Carousel
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                autoPlay
                interval={4000}
                infiniteLoop
              >
                {logoRows.map((row) => (
                  <div key={row[0].id} className="grid grid-cols-10">
                    {row.map((logo) => {
                      const { altText, sourceUrl } = logo.featuredImage.node;
                      return (
                        <div
                          key={logo.id}
                          className="col-span-2 px-10 mx-auto wow animated zoomIn"
                          data-wow-delay="0.3s"
                        >
                          <img
                            className="lazy loaded"
                            src={sourceUrl}
                            data-src={sourceUrl}
                            data-was-processed="true"
                            alt={altText}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </>
      )}
    </>
  );
}
