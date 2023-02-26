import { getIconDataMap } from "components/forms/Admin/Skills/constants";
import { SeachFilterOptionMap } from "./types";

export const SEARCH_FILTTER_OPTIONS: SeachFilterOptionMap = {
  Card: {
    rarity: {
      type: "등급",
      selector: "checkbox",
      values: [1, 2, 3],
      labels: ["R", "SR", "SSR"],
    },
    types: {
      type: "타입",
      selector: "radio",
      values: ["none", "training", "support"],
      labels: ["전체", "육성", "서포터"],
    },
    supportTypes: {
      type: "서포터 타입",
      selector: "checkbox",
      values: ["speed", "stamina", "power", "guts", "int", "friend", "group"],
      labels: ["스피드", "스태미나", "파워", "근성", "지능", "친구", "그룹"],
      imgSrc: [
        "/image/icons/speed.png",
        "/image/icons/stamina.png",
        "/image/icons/power.png",
        "/image/icons/guts.png",
        "/image/icons/int.png",
        "/image/icons/friend.png",
        "/image/icons/group.png",
      ],
    },
    limited: {
      type: "한정 여부",
      selector: "radio",
      values: ["none", true, false],
      labels: ["전체", "한정", "일반"],
    },
  },
  Skill: {
    skillRarity: {
      type: "스킬 종류",
      selector: "checkbox",
      ...getIconDataMap(),
    },
    skillDistance: {
      type: "거리",
      selector: "checkbox",
      values: ["단거리", "마일", "중거리", "장거리"],
      labels: ["단거리", "마일", "중거리", "장거리"],
    },
    skillStrategy: {
      type: "작전",
      selector: "checkbox",
      values: ["도주", "선행", "선입", "추입"],
      labels: ["도주", "선행", "선입", "추입"],
    },
    skillGroundType: {
      type: "더트 마장 여부",
      selector: "radio",
      values: ["turf", "duct"],
      labels: ["모든 마장", "더트"],
    },
  },
};
