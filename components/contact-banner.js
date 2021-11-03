export default function ContactBanner() {
  return (
    <section id="contactBar2-topsvg" className="no-padding">
      <div className="arrow-section-divider">
        <div className="wave-layer-bkgnd">
          <div className="container mx-auto px-10 sm:px-32 md:px-52 lg:px-72 xl:px-96">
            <div className="text-center">
              <div className="leading-tight">
                <h1>
                  {`Find out how the `}
                  <span
                    style={{
                      fontWeight: 700,
                      fontFamily: "questrial regular, sans-serif",
                    }}
                  >
                    brightseed.
                  </span>
                  {` way of working can help you`}
                </h1>
              </div>
            </div>
            <div className="text-center">
              <div className="py-5">
                <a
                  data-scroll=""
                  href="https://brightseed.io/contact"
                  className="btn                                   btn-secondary                                   btn-effect                                   btn-icon-container-main external"
                >
                  Contact Us
                  <i className="fa fa-angle-right btn-icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
