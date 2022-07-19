import { useQuery } from "@apollo/client";
import { GET_CARDS } from "queries/cards";

import { getGhlErrorStatus } from "helper";

import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";
import Helmet from "Helmet/Helmet";

const CardList = dynamic(() => import("components/Card/Cards"), {
  loading: () => <Loader />,
});

export const CardListPage = () => {
  const { data, loading, error } = useQuery(GET_CARDS);
  const errorCode = error ? getGhlErrorStatus(error) : null;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet
        title={"카드 리스트"}
        url={`/cards`}
        description={"육성, 서포터 카드 리스트 페이지 입니다"}
      />
      <CardList data={data} statusCode={errorCode} />
    </>
  );
};

export default CardListPage;
