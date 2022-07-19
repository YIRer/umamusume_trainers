import { GET_SKILLS } from "queries/skills";

import { useQuery } from "@apollo/client";
import { getGhlErrorStatus } from "helper";

import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";
import Helmet from "Helmet/Helmet";

const SkillList = dynamic(() => import("components/Skills/Skills"), {
  loading: () => <Loader />,
});

export const SkillListPage = () => {

  const { data, loading, error } = useQuery(GET_SKILLS);
  const errorCode = error ? getGhlErrorStatus(error) : null;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet
        title={"스킬 리스트"}
        url={`/skills`}
        description={
          "우마무스메 스킬 리스트 페이지 입니다"
        }
      />
      <SkillList data={data} statusCode={errorCode} />
    </>
  );
};

export default SkillListPage;
