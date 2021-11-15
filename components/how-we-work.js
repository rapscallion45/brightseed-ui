import parse from "html-react-parser";
import { FaAngleRight } from "react-icons/fa";
import ButtonLink from "./button-link";

export default function HowWeWork({ items }) {
  return (
    <>
      {items && (
        <section id="how-we-work">
          <div className="container mx-auto max-w-6xl px-5">
            {items.map((item) => {
              const { serviceItems } = item.serviceItems;
              return (
                <div key={item.id} className="sec-title text-center">
                  <h2 className="wow animated bounceInLeft">{item.title}</h2>
                  <div className="wow animated bounceInRight">
                    {parse(item.excerpt)}
                  </div>
                  {item.content && (
                    <div className="py-10">{parse(item.content)}</div>
                  )}
                  {serviceItems && (
                    <div className="grid grid-cols-12 py-14">
                      {serviceItems.map((serviceItem) => (
                        <div
                          key={serviceItem.id}
                          className="col-span-12 sm:col-span-6 lg:col-span-3 px-5 text-center wow animated zoomIn"
                        >
                          <div className="service-item">
                            <div className="service-icon">
                              <img
                                src={serviceItem.featuredImage.node.sourceUrl}
                                alt={serviceItem.featuredImage.node.altText}
                              />
                            </div>
                            <h3 className="py-4">{serviceItem.title}</h3>
                            {parse(serviceItem.excerpt)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="md:col-start-2 flex justify-center fullWidth wow animated fadeInUp pt-20">
              <ButtonLink
                uri="/#recent-works"
                variant="secondary"
                text="See Our Work"
                hasIcon
              >
                <FaAngleRight />
              </ButtonLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
