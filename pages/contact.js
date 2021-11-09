import Head from 'next/head';
import parse from 'html-react-parser';
import Layout from '../components/layout';
import ContactForm from '../components/contact-form';
import { getPageDataByUri, getPrimaryMenu } from '../lib/api';

const Contact = ({ menuData, pageData: { title, content, seo }, preview }) => (
  <Layout preview={preview} navMenuItems={menuData}>
    <Head>{parse(seo.fullHead)}</Head>
    <section id="contact-header">
      <div className="container max-w-6xl mx-auto pt-20 pb-5 px-5">
        <div className="sec-title text-center wow animated fadeInDown">
          <h2>{title}</h2>
          {parse(content)}
        </div>
        <ContactForm />
      </div>
    </section>
  </Layout>
);
export default Contact;

export async function getStaticProps({ preview = false }) {
  const menuData = await getPrimaryMenu();
  const pageData = await getPageDataByUri('/contact');
  return {
    props: { menuData, pageData, preview },
  };
}
