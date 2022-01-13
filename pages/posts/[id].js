import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import {getAllPostIds, getPostData} from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
