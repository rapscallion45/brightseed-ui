import ContentPage from '../components/content-page';
import AboutOutsourcing from '../components/about-outsourcing';
import { getPage } from '../lib/content.mjs';

export default function About({ page }) {
  return <ContentPage page={page} path="/about" intro={<AboutOutsourcing />} />;
}
export function getStaticProps() { return { props: { page: getPage('about') } }; }
