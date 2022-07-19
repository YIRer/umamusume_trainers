import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";

import Helmet from "Helmet/Helmet";

import { useQuery } from "@apollo/client";
import { GET_UMAMUSUMES } from "queries/umamusume";

import { getGhlErrorStatus } from "helper";

const UmamusumeList = dynamic(
  () => import("components/Umamusume/UmamusumeList"),
  { loading: () => <Loader /> }
);

export const UmamusumeListPage = () => {
  const { data, loading, error } = useQuery(GET_UMAMUSUMES);
  const errorCode = error ? getGhlErrorStatus(error) : null;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet
        title={"우마무스메 리스트"}
        url={`/umamusume`}
        description={
          "현재 등록된 우마무스메/주요 등장 인물 리스트 페이지 입니다"
        }
      />
      <UmamusumeList data={data} statusCode={errorCode} />
    </>
  );
};

export default UmamusumeListPage;
