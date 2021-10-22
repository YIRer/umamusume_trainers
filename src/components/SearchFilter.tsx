import React from "react";

import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

const SEARCH_FILTTER_OPTIONS = {
  ["Card"]: {
    rarity: {
      type: "text",
      selector: "checkbox",
      values: [1, 2, 3],
      label: ["N", "SR", "SSR"],
    },
    types: {
      type: "icon",
      selector: "radio",
      values: ["none", "training", "support"],
      label: ["전체", "육성", "서포터"],
    },
    supportTypes: {
      type: "icon",
      selector: "checkbox",
      values: ["none", "speed", "stamina", "power", "guts", "intelligence"],
      label: ["전체", "스피드", "스태미나", "파워", "근성", "지능"],
    },
    limited: {
      type: "icon",
      selector: "radio",
      values: ["none", true, false],
      label: ["전체", "한정", "일반"],
    },
  },
  ["Skill"]: {
    rarity: {
      type: "text",
      selector: "checkbox",
      values: [1, 2, 3],
      label: ["N", "SR", "SSR"],
    },
    distance: {
      type: "text",
      selector: "checkbox",
      values: ["단거리", "마일", "중거리", "장거리"],
      label: ["단거리", "마일", "중거리", "장거리"],
    },
    strategy: {
      type: "text",
      selector: "checkbox",
      values: ["도주", "선행", "선입", "추입"],
      label: ["도주", "선행", "선입", "추입"],
    },
  },
};

function SearchFilter({ searchType, onUpdateSearchFilter }) {
  return <div></div>;
}

export default SearchFilter;
