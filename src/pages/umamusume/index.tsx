import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";
import { GET_UMAMUSUMES } from "queries/umamusume";

import { getGhlErrorStatus } from "helper";

const UmamusumeList = dynamic(
  () => import("components/Umamusume/UmamusumeList"),
  { loading: () => <Loader /> }
);

export const UmamusumeListPage = ({ data, statusCode }) => {
  return <UmamusumeList data={data} statusCode={statusCode} />;
};

UmamusumeListPage.getInitialProps = async (ctx) => {
  try {
    const apolloClient = ctx.apolloClient;
    const { data } = await apolloClient.query({
      query: GET_UMAMUSUMES,
    });
    return {
      data,
    };
  } catch (err) {
    return { data: {}, statusCode: getGhlErrorStatus(err) };
  }
};

export default UmamusumeListPage;
