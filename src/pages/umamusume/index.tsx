import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";

import Helmet from "Helmet/Helmet";
import { GET_UMAMUSUMES } from "queries/umamusume";

import { getGhlErrorStatus } from "helper";

const UmamusumeList = dynamic(
  () => import("components/Umamusume/UmamusumeList"),
  { loading: () => <Loader /> }
);

export const UmamusumeListPage = ({ data, statusCode }) => {
  return (
    <>
      <Helmet
        title={'우마무스메 리스트'}
        url={`/umamusume`}
        description={'현재 등록된 우마무스메/주요 등장 인물 리스트 페이지 입니다'}
      />
      <UmamusumeList data={data} statusCode={statusCode} />
    </>
  );
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
