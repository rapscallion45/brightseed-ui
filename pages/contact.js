import parse from "html-react-parser";
import Head from "next/head";
import Layout from "../components/layout";
import { getPageDataByUri, getPrimaryMenu } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

const Contact = ({ menuData, pageData: { title, content }, preview }) => (
  <Layout preview={preview} navMenuItems={menuData}>
    <Head>
      <title>This is the {CMS_NAME} contact page</title>
    </Head>
    <section id="contact-header">
      <div className="container max-w-6xl mx-auto pt-20 pb-5 px-5">
        <div class="sec-title text-center wow animated fadeInDown">
          <h2>{title}</h2>
          {parse(content)}
        </div>
      </div>
    </section>
  </Layout>
);
export default Contact;

export async function getStaticProps({ preview = false }) {
  const menuData = await getPrimaryMenu();
  const pageData = await getPageDataByUri("/contact");
  return {
    props: { menuData, pageData, preview },
  };
}
