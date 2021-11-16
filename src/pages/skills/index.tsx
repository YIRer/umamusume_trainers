import { GET_SKILLS } from "queries/skills";

import { getGhlErrorStatus } from "helper";

import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";
import Helmet from "Helmet/Helmet";

const SkillList = dynamic(() => import("components/Skills/Skills"), {
  loading: () => <Loader />,
});

export const SkillListPage = ({ data, statusCode }) => {
  return (
    <>
      <Helmet
        title={"스킬 리스트"}
        url={`/skills`}
        description={
          "우마무스메 스킬 리스트 페이지 입니다"
        }
      />
      <SkillList data={data} statusCode={statusCode} />
    </>
  );
};

SkillListPage.getInitialProps = async (ctx) => {
  try {
    const apolloClient = ctx.apolloClient;
    const { data } = await apolloClient.query({
      query: GET_SKILLS,
    });
    return {
      data,
    };
  } catch (err) {
    return {
      data: {
        skills: [],
      },
      statusCode: getGhlErrorStatus(err),
    };
  }
};

export default SkillListPage;
