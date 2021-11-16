import { GET_SKill } from "queries/skills";
import { getGhlErrorStatus } from "helper";

import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";

const SkillInfo = dynamic(() => import("components/Skills/SkillInfo"), {
  loading: () => <Loader />,
});

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
