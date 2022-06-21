import { CardType } from "types/Card/card";

export const supportTypes = {
  speed: "스피드",
  stamina: "스태미나",
  power: "파워",
  guts: "근성",
  int: "지능",
  friend: "친구",
  group: "그룹",
};

export const formattedDescriptionForCards = (cardData: CardType): string => {
  
  const formattedStatus = cardData.playable
    ? `더트 ${cardData.status.ground.duct.rank}, 잔디 ${cardData.status.ground.turf.rank}, 단거리 ${cardData.status.distance.short.rank}, 마일 ${cardData.status.distance.mile.rank}, 중거리 ${cardData.status.distance.medium.rank}, 장거리 ${cardData.status.distance.long.rank}, 도주 ${cardData.status.strategy.escape.rank}, 선행 ${cardData.status.strategy.leading.rank}, 선입 ${cardData.status.strategy.between.rank}, 추입 ${cardData.status.strategy.pushing.rank}, 스피드 ${cardData.status.status.speed.rank}, 스태미나 ${cardData.status.status.stamina.rank}, 파워 ${cardData.status.status.power.rank}, 근성 ${cardData.status.status.guts.rank}, 지능 ${cardData.status.status.intelligence.rank}`
    : `${supportTypes[cardData.supportType]}`;

  let star = "";

  for (let i = 0; i < cardData.star; i++) {
    star += "★";
  }
  return `이름: ${cardData.name.ko}(${
    cardData.name.ja
  }), 등급: ${star}, 종류: ${
    cardData.playable ? "서포트" : "육성"
  } 상세정보: ${formattedStatus}`;
};
