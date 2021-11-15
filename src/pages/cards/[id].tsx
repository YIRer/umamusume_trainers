import CardInfo from "components/Card/CardInfo";

import { GET_CARD } from "queries/cards";
import { getGhlErrorStatus } from "helper";
const CardInfoPage = ({ data, statusCode }) => {
  return <CardInfo data={data} statusCode={statusCode} />;
};

CardInfoPage.getInitialProps = async (ctx) => {
  const { query, apolloClient } = ctx;
  try {
    const { data } = await apolloClient.query({
      query: GET_CARD,
      variables: { id: query.id },
    });

    return { data };
  } catch (err) {
    return { data: {}, statusCode: getGhlErrorStatus(err) };
  }
};

export default CardInfoPage;
