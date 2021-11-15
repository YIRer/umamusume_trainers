import { GET_SKILLS } from "queries/skills";

import { getGhlErrorStatus } from "helper";
import SkillList from "components/Skills/Skills";

export const SkillListPage = ({ data, statusCode }) => {
  return <SkillList data={data} statusCode={statusCode} />;
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
