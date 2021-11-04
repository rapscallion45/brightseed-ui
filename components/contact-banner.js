import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

export default function ContactBanner() {
  return (
    <section id="contactBar2-topsvg" className="no-padding">
      <div className="arrow-section-divider">
        <div className="wave-layer-bkgnd">
          <div className="container mx-auto px-10 sm:px-32 md:px-52 lg:px-72 xl:px-96">
            <div className="text-center">
              <div className="leading-tight">
                <h1>
                  {'Find out how the '}
                  <span
                    style={{
                      fontWeight: 700,
                      fontFamily: 'questrial regular, sans-serif',
                    }}
                  >
                    brightseed.
                  </span>
                  {' way of working can help you'}
                </h1>
              </div>
            </div>
            <div className="text-center">
              <div className="py-5">
                <Link href="/contact">
                  <a
                    data-scroll=""
                    className="btn btn-secondary btn-effect btn-icon-container-main external"
                  >
                    Contact Us
                    <i className="btn-icon">
                      <FaAngleRight />
                    </i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
