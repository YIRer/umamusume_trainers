import React from "react";
import Head from "next/head";

type HelemtTypes = {
  keywords?: string;
  title?: string;
  url?: string;
  description?: string;
  imageUrl?: string;
};

const RHelmet = ({
  keywords,
  title,
  url,
  description,
  imageUrl,
}: HelemtTypes) => {
  const formattedTitle = `${title ? title + " - " : ""}우마무스메 트레이너스`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
      />
      <meta name="title" content={formattedTitle} />
      <meta
        name="description"
        content={`${description ?? "우마무스메 카드풀 덱 빌더 사이트 입니다."}`}
      />
      <meta
        name="keywords"
        content={`우마무스메,우마무스메 트레이너스,ウマ娘,umamusume,${keywords}`}
      />
      <meta property="og:type" content={formattedTitle} />
      <meta property="og:locale" content="ko-KR" />
      <meta
        property="og:description"
        content={`${description ?? "우마무스메 카드풀 덱 빌더 사이트 입니다."}`}
      />
      <meta
        property="og:url"
        content={`https://umamusume-trainers.me${url ?? ""}`}
      />
      <meta
        property="og:image"
        content={
          imageUrl ||
          "https://umamusume-trainers.s3.ap-northeast-2.amazonaws.com/image/logo.png"
        }
      />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:site"
        content={`https://umamusume-trainers.me${url ?? ""}`}
      />
      <link
        rel="canonical"
        href={`https://umamusume-trainers.me${url ?? ""}`}
      />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={
          imageUrl ||
          "https://umamusume-trainers.s3.ap-northeast-2.amazonaws.com/image/logo.png"
        }
      />
      <title>{formattedTitle}</title>
    </Head>
  );
};

export default RHelmet;
