import ContentPage from '../components/content-page';
import { getPage } from '../lib/content.mjs';

export default function Terms({ page }) {
  return <ContentPage page={page} path="/terms" />;
}

export function getStaticProps() {
  return { props: { page: getPage('terms') } };
}
