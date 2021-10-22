import { TypeOfCard, TypeOfSupportCard } from "types/Card/card";

export type SeachFilterStateType = {
  keyword: string;
  rarity?: number[];
  types?: "none" | TypeOfCard;
  supportTypes?: TypeOfSupportCard[];
  limited?: string | boolean;
  skillRarity?: string[];
  skillDistance?: string[];
  skillStrategy?: string[];
};

export const initialState: SeachFilterStateType = {
  keyword: "",
  rarity: [],
  types: "none",
  supportTypes: [],
  limited: "none",
  skillRarity: [],
  skillDistance: [],
  skillStrategy: [],
};

export const ACTION_TYPES = {
  UPDATE_KEYWORD_FILTER: "SearchForm/UPDATE_KEYWORD_FILTER",
  UPDATE_RARITY_FILTER: "SearchForm/UPDATE_RARITY_FILTER",
  UPDATE_PLAYABLE_FILTER: "SearchForm/UPDATE_PLAYABLE_FILTER",
  UPDATE_SUPPORT_TYPE_FILTER: "SearchForm/UPDATE_SUPPORT_TYPE_FILTER",
  UPDATE_LIMITED_FILTER: "SearchForm/UPDATE_LIMITED_FILTER",
  UPDATE_SKILL_RARITY_FILTER: "SearchForm/UPDATE_SKILL_RARITY_FILTER",
  UPDATE_SKILL_DISTANCE_FILTER: "SearchForm/UPDATE_SKILL_RARITY_FILTER",
  UPDATE_SKILL_STRATEGY_FILTER: "SearchForm/UPDATE_SKILL_STRATEGY_FILTER",

  CLEAR_KEYWORD_FILTER: "SearchForm/CLEAR_KEYWORD_FILTER",
  CLEAR_RARITY_FILTER: "SearchForm/CLEAR_RARITY_FILTER",
  CLEAR_PLAYABLE_FILTER: "SearchForm/CLEAR_PLAYABLE_FILTER",
  CLEAR_SUPPORT_TYPE_FILTER: "SearchForm/CLEAR_SUPPORT_TYPE_FILTER",
  CLEAR_LIMITED_FILTER: "SearchForm/CLEAR_LIMITED_FILTER",
  CLEAR_SKILL_RARITY_FILTER: "SearchForm/CLEAR_SKILL_RARITY_FILTER",
  CLEAR_SKILL_DISTANCE_FILTER: "SearchForm/CLEAR_SKILL_RARITY_FILTER",
  CLEAR_SKILL_STRATEGY_FILTER: "SearchForm/CLEAR_SKILL_STRATEGY_FILTER",
  CLEAR_ALL: "SearchForm/CLEAR_ALL",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_KEYWORD_FILTER:
      state.keyword = action.payload;
      break;
    case ACTION_TYPES.UPDATE_RARITY_FILTER:
      state.rarity = [...state.rarity, action.payload];
    case ACTION_TYPES.UPDATE_PLAYABLE_FILTER:
      state.types = action.payload;
      break;
    case ACTION_TYPES.UPDATE_SUPPORT_TYPE_FILTER:
      state.supportTypes = [...state.rarity, action.payload];
      break;
    case ACTION_TYPES.UPDATE_LIMITED_FILTER:
      state.limited = action.payload;
      break;
    case ACTION_TYPES.UPDATE_SKILL_RARITY_FILTER:
      state.skillRarity = [...state.skillRarity, action.payload];
      break;
    case ACTION_TYPES.UPDATE_SKILL_DISTANCE_FILTER:
      state.skillDistance = [...state.skillDistance, action.payload];
      break;
    case ACTION_TYPES.UPDATE_SKILL_STRATEGY_FILTER:
      state.skillStrategy = [...state.skillStrategy, action.payload];
      break;

    case ACTION_TYPES.CLEAR_KEYWORD_FILTER:
      state.keyword = "";
      break;
    case ACTION_TYPES.CLEAR_RARITY_FILTER:
      state.rarity = [];
      break;
    case ACTION_TYPES.CLEAR_PLAYABLE_FILTER:
      state.types = "none";
      break;
    case ACTION_TYPES.CLEAR_SUPPORT_TYPE_FILTER:
      state.supportTypes = [];
      break;
    case ACTION_TYPES.CLEAR_LIMITED_FILTER:
      state.limited = "none";
      break;
    case ACTION_TYPES.CLEAR_SKILL_RARITY_FILTER:
      state.skillRarity = [];
      break;
    case ACTION_TYPES.CLEAR_SKILL_DISTANCE_FILTER:
      state.skillDistance = [];
      break;
    case ACTION_TYPES.CLEAR_SKILL_STRATEGY_FILTER:
      state.skillStrategy = [];
      break;
    case ACTION_TYPES.CLEAR_ALL:
      state = initialState;
      break;
    default:
      break;
  }

  return state;
};
