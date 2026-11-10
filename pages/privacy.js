import ContentPage from '../components/content-page';
import { getPage } from '../lib/content.mjs';

export default function Privacy({ page }) {
  return <ContentPage page={page} path="/privacy" />;
}

export function getStaticProps() {
  return { props: { page: getPage('privacy') } };
}
