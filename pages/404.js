import Link from 'next/link';
import Layout from '../components/layout';
import PageSeo from '../components/page-seo';
import { PageHeading } from '../components/agency-shared';

export default function NotFound() {
  return (
    <Layout>
      <PageSeo title="Page Not Found" description="This page could not be found." noindex />
      <PageHeading eyebrow="404" title="A Little Off the Beaten Path">The page you’re looking for has moved or doesn’t exist. Let’s get you back on track.</PageHeading>
      <div className="agency-section agency-center"><Link href="/" className="agency-button">Back To Home</Link></div>
    </Layout>
  );
}
