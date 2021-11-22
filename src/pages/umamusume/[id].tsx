import { GET_UMAMUSUME } from "queries/umamusume";

import { getGhlErrorStatus } from "helper";

import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";

const Umamusume = dynamic(() => import("components/Umamusume/Umamusume"), {
  loading: () => <Loader />,
});

const UmamusumeDetailPage = ({ data, statusCode }) => {
  return <Umamusume data={data} statusCode={statusCode} />;
};

UmamusumeDetailPage.getInitialProps = async (ctx) => {
  const { query, apolloClient } = ctx;
  try {
    const { data } = await apolloClient.query({
      query: GET_UMAMUSUME,
      variables: { id: query.id },
    });

    return { data };
  } catch (err) {
    return { data: {}, statusCode: getGhlErrorStatus(err) };
  }
};

export default UmamusumeDetailPage;
