import { GET_CARDS } from "queries/cards";

import { getGhlErrorStatus } from "helper";

import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";

const CardList = dynamic(() => import("components/Card/Cards"), {
  loading: () => <Loader />,
});

export const CardListPage = ({ data, statusCode }) => {
  return <CardList data={data} statusCode={statusCode} />;
};

CardListPage.getInitialProps = async (ctx) => {
  try {
    const apolloClient = ctx.apolloClient;
    const { data } = await apolloClient.query({
      query: GET_CARDS,
    });
    return {
      data,
    };
  } catch (err) {
    return {
      data: {
        cards: [],
      },
      statusCode: getGhlErrorStatus(err),
    };
  }
};

export default CardListPage;
