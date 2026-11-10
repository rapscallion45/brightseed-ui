export default function PriceModels({ items }) {
  return (
    <section id="price">
      <div className="container mx-auto max-w-6xl px-5 grid grid-cols-12 pb-10">
        <div className="col-span-12 sec-title text-center wow animated fadeInDown">
          <h2>Our Pricing Models</h2>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="col-md-4 wow animated fadeInUp col-span-12 md:col-span-4 px-3"
          >
            <div className="price-table text-center">
              <span>{item.title}</span>
              <div className="value flex justify-center">
                <span />
                <br />
                <img
                  width="512"
                  height="512"
                  src={item.image.sourceUrl}
                  data-src={item.image.sourceUrl}
                  className="attachment-post-thumbnail size-post-thumbnail wp-post-image lazy loaded"
                  alt={item.image.altText}
                  loading="lazy"
                  data-srcset={item.image.srcSet}
                  data-sizes={item.image.sizes}
                  sizes={item.image.sizes}
                  srcSet={item.image.srcSet}
                  data-was-processed="true"
                />
                <br />
                <br />
                <span />
              </div>
              <ul>
                <li className="h-28 flex items-center justify-center text-sm sm:text-base">
                  {item.priceDetails.detailOne}
                </li>
                <li className="h-28 flex items-center justify-center text-sm sm:text-base">
                  {item.priceDetails.detailTwo}
                </li>
                <li className="h-28 flex items-center justify-center text-sm sm:text-base">
                  {item.priceDetails.detailThree}
                </li>
                <li className="text-sm sm:text-base">
                  <a href={item.priceDetails.priceLink}>
                    {item.priceDetails.priceLinkText}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
