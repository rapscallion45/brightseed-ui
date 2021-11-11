import parse from 'html-react-parser';

export default function HowWeWork({ items }) {
  return (
    <>
      {items && (
        <section id="how-we-work">
          <div className="container mx-auto max-w-6xl px-5">
            {items.map((item) => (
              <div key={item.id} className="sec-title text-center">
                <h2 className="wow animated bounceInLeft">{item.title}</h2>
                <div className="wow animated bounceInRight">
                  {parse(item.excerpt)}
                </div>
                <div className="py-10">{parse(item.content)}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
