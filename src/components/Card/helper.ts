import { CardType } from "types/Card/card";

export const supportTypes = {
  speed: "스피드",
  stamina: "스테미너",
  power: "파워",
  guts: "근성",
  int: "지능",
  friend: "친구",
};

export const formattedDescriptionForCards = (cardData: CardType): string => {
  const formattedStatus = cardData.playable
    ? `덕트 ${cardData.status.ground.duct}, 잔디 ${cardData.status.ground.turf}, 단거리 ${cardData.status.distance.short}, 마일 ${cardData.status.distance.mile}, 중거리 ${cardData.status.distance.short}, 단거리 ${cardData.status.distance.short}, 단거리 ${cardData.status.distance.medium}, 장거리 ${cardData.status.distance.long}, 도주 ${cardData.status.strategy.escape}, 선행 ${cardData.status.strategy.leading}, 선입 ${cardData.status.strategy.between}, 추입 ${cardData.status.strategy.pushing}, 스피드 ${cardData.status.status.speed}, 스테미나 ${cardData.status.status.stamina}, 파워 ${cardData.status.status.power}, 근성 ${cardData.status.status.guts}, 지능 ${cardData.status.status.intelligence}`
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
