import SkillInfo from "components/Skills/SkillInfo";
import { GET_SKill } from "queries/skills";
import { getGhlErrorStatus } from "helper";

const SkillInfoPage = ({ data, statusCode }) => {
  return <SkillInfo data={data} statusCode={statusCode} />;
};

SkillInfoPage.getInitialProps = async (ctx) => {
  const { query, apolloClient } = ctx;
  try {
    const { data } = await apolloClient.query({
      query: GET_SKill,
      variables: { id: query.id },
    });

    return { data };
  } catch (err) {
    return { data: {}, statusCode: getGhlErrorStatus(err) };
  }
};

export default SkillInfoPage;
