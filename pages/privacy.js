import parse from 'html-react-parser';
import Head from 'next/head';
import Container from '../components/container';
import Layout from '../components/layout';
import { getPageDataByUri, getPrimaryMenu } from '../lib/api';

const Privacy = ({ menuData, pageData: { title, content, seo }, preview }) => (
  <Layout preview={preview} navMenuItems={menuData}>
    <Head>{parse(seo.fullHead)}</Head>
    <section id="contact-header">
      <Container class="pt-5 pb-5">
        <div className="policy-container">
          <h1>{title}</h1>
          {parse(content)}
        </div>
      </Container>
    </section>
  </Layout>
);
export default Privacy;

export async function getStaticProps({ preview = false }) {
  const menuData = await getPrimaryMenu();
  const pageData = await getPageDataByUri('/privacy');
  return {
    props: { menuData, pageData, preview },
  };
}
