import Link from 'next/link';
import parse from 'html-react-parser';
import { FaAngleRight } from 'react-icons/fa';

const Intro = ({ content }) => (
  <>
    <section id="introduction" className="no-padding-bottom">
      <div className="container mx-auto px-5 sm:px-15 md:px-30 lg:px-50 xl:px-80">
        <div className="col-md-offset-2 col-md-8 text-center">
          <div className="welcome-block">
            <div className="message-body">
              {parse(content)}
              <div className="text-center">
                <div className="py-5">
                  <Link href="/#how-we-work">
                    <a className="btn btn-border btn-effect btn-border-icon-container external">
                      How We Work
                      <i className="btn-icon btn-icon-border">
                        <FaAngleRight />
                      </i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="no-padding">
      <div
        id="layout-collage-fullwidth-bottom"
        className="container-fluid arrow-section-divider"
      >
        <svg
          className="arrow-section-divider"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          width="100%"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160L120,186.7C240,213,480,267,720,261.3C960,256,1200,
                192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,
                720,320C480,320,240,320,120,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  </>
);
export default Intro;
