import Container from './container';

export default function PostThanksText() {
  return (
    <section id="thanks-text" className="no-padding-top">
      <Container className="mx-auto">
        <div className="text-center">
          <div className="leading-tight">
            <h1 className="blog-thanks-text">Thanks for reading!</h1>
          </div>
        </div>
      </Container>
    </section>
  );
}
