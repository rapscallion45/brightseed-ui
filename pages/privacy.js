import parse from "html-react-parser";
import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import { getPageDataByUri, getPrimaryMenu } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

const Privacy = ({ menuData, pageData: { title, content }, preview }) => (
  <Layout preview={preview} navMenuItems={menuData}>
    <Head>
      <title>This is the {CMS_NAME} contact page</title>
    </Head>
    <section id="contact-header">
      <Container class="pt-5 pb-5">
        <div class="policy-container">
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
  const pageData = await getPageDataByUri("/privacy");
  return {
    props: { menuData, pageData, preview },
  };
}
