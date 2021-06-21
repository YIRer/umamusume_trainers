import React from "react";
import { Helmet } from "react-helmet";

type HelemtTypes = {
  keywords?: string;
  title?: string;
  url?: string;
  description?: string;
};

const RHelmet = ({ keywords, title, url, description }: HelemtTypes) => {
  const formattedTitle = `${title ? title + "-" : ""} 우마무스메 트레이너스`;

  return (
    <Helmet>
      <meta name="title" content={formattedTitle} />
      <meta
        name="description"
        content={`${description ?? "우마무스메 카드풀 덱 빌더 사이트 입니다."}`}
      />
      <meta
        name="keywords"
        content={`우마무스메,우마무스메 트레이너스,ウマ娘,umamusume,${keywords}`}
      />
      <link
        rel="canonical"
        href={`https://umamusume-trainers.me${url ?? ""}`}
      />
      <title>{formattedTitle}</title>
    </Helmet>
  );
};

export default RHelmet;
