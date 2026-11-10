import ContentPage from '../components/content-page';
import AboutOutsourcing from '../components/about-outsourcing';
import { getPage } from '../lib/content.mjs';

export default function About({ page }) {
  return (
    <ContentPage page={page} path="/about" eyebrow="About" heading="brightseed">
      <AboutOutsourcing />
    </ContentPage>
  );
}
export function getStaticProps() { return { props: { page: getPage('about') } }; }
