import { TypeOfCard, TypeOfSupportCard } from "types/Card/card";
import { omit } from "lodash";

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
  UPDATE_ALL_STATE: "SearchForm/UPDATE_ALL_STATE",
  UPDATE_KEYWORD_FILTER: "SearchForm/UPDATE_KEYWORD_FILTER",
  UPDATE_RARITY_FILTER: "SearchForm/UPDATE_RARITY_FILTER",
  UPDATE_PLAYABLE_FILTER: "SearchForm/UPDATE_PLAYABLE_FILTER",
  UPDATE_SUPPORT_TYPE_FILTER: "SearchForm/UPDATE_SUPPORT_TYPE_FILTER",
  UPDATE_LIMITED_FILTER: "SearchForm/UPDATE_LIMITED_FILTER",
  UPDATE_SKILL_RARITY_FILTER: "SearchForm/UPDATE_SKILL_RARITY_FILTER",
  UPDATE_SKILL_DISTANCE_FILTER: "SearchForm/UPDATE_SKILL_DISTANCE_FILTER",
  UPDATE_SKILL_STRATEGY_FILTER: "SearchForm/UPDATE_SKILL_STRATEGY_FILTER",

  CLEAR_KEYWORD_FILTER: "SearchForm/CLEAR_KEYWORD_FILTER",
  CLEAR_RARITY_FILTER: "SearchForm/CLEAR_RARITY_FILTER",
  CLEAR_PLAYABLE_FILTER: "SearchForm/CLEAR_PLAYABLE_FILTER",
  CLEAR_SUPPORT_TYPE_FILTER: "SearchForm/CLEAR_SUPPORT_TYPE_FILTER",
  CLEAR_LIMITED_FILTER: "SearchForm/CLEAR_LIMITED_FILTER",
  CLEAR_SKILL_RARITY_FILTER: "SearchForm/CLEAR_SKILL_RARITY_FILTER",
  CLEAR_SKILL_DISTANCE_FILTER: "SearchForm/CLEAR_SKILL_RARITY_FILTER",
  CLEAR_SKILL_STRATEGY_FILTER: "SearchForm/CLEAR_SKILL_STRATEGY_FILTER",
  CLEAR_ALL_FILTER: "SearchForm/CLEAR_ALL_FILTER",
  CLEAR_ALL_FILTER_BY_PAYLOAD: "SearchForm/CLEAR_ALL_FILTER_BY_PAYLOAD",
  CLEAR_ALL: "SearchForm/CLEAR_ALL",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_ALL_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPES.UPDATE_KEYWORD_FILTER:
      return {
        ...state,
        keyword: action.payload,
      };
    case ACTION_TYPES.UPDATE_RARITY_FILTER:
      if (action.checked) {
        return {
          ...state,
          rarity: state.rarity.filter((rarity) => rarity !== action.payload),
        };
      }
      return {
        ...state,
        rarity: [...state.rarity, action.payload],
      };
    case ACTION_TYPES.UPDATE_PLAYABLE_FILTER:
      if (action.payload === "training") {
        return {
          ...state,
          types: action.payload,
          supportTypes: [],
        };
      }
      return {
        ...state,
        types: action.payload,
      };
    case ACTION_TYPES.UPDATE_SUPPORT_TYPE_FILTER:
      if (action.checked) {
        return {
          ...state,
          supportTypes: state.supportTypes.filter(
            (supportType) => supportType !== action.payload
          ),
        };
      }

      return {
        ...state,
        supportTypes: [...state.supportTypes, action.payload],
      };
    case ACTION_TYPES.UPDATE_LIMITED_FILTER:
      return {
        ...state,
        limited: action.payload,
      };
    case ACTION_TYPES.UPDATE_SKILL_RARITY_FILTER:
      if (action.checked) {
        return {
          ...state,
          skillRarity: state.skillRarity.filter(
            (rarity) => rarity !== action.payload
          ),
        };
      }
      return {
        ...state,
        skillRarity: [...state.skillRarity, action.payload],
      };
    case ACTION_TYPES.UPDATE_SKILL_DISTANCE_FILTER:
      if (action.checked) {
        return {
          ...state,
          skillDistance: state.skillDistance.filter(
            (distance) => distance !== action.payload
          ),
        };
      }
      return {
        ...state,
        skillDistance: [...state.skillDistance, action.payload],
      };
    case ACTION_TYPES.UPDATE_SKILL_STRATEGY_FILTER:
      if (action.checked) {
        return {
          ...state,
          skillStrategy: state.skillStrategy.filter(
            (strategy) => strategy !== action.payload
          ),
        };
      }
      return {
        ...state,
        skillStrategy: [...state.skillStrategy, action.payload],
      };

    case ACTION_TYPES.CLEAR_KEYWORD_FILTER:
      return {
        ...state,
        keyword: "",
      };
    case ACTION_TYPES.CLEAR_RARITY_FILTER:
      return {
        ...state,
        rarity: [],
      };
    case ACTION_TYPES.CLEAR_PLAYABLE_FILTER:
      return {
        ...state,
        types: "none",
      };
    case ACTION_TYPES.CLEAR_SUPPORT_TYPE_FILTER:
      return {
        ...state,
        supportTypes: [],
      };
    case ACTION_TYPES.CLEAR_LIMITED_FILTER:
      return {
        ...state,
        limited: "none",
      };
    case ACTION_TYPES.CLEAR_SKILL_RARITY_FILTER:
      return {
        ...state,
        skillRarity: [],
      };
    case ACTION_TYPES.CLEAR_SKILL_DISTANCE_FILTER:
      return {
        ...state,
        skillDistance: [],
      };
    case ACTION_TYPES.CLEAR_SKILL_STRATEGY_FILTER:
      return {
        ...state,
        skillStrategy: [],
      };
    case ACTION_TYPES.CLEAR_ALL_FILTER:
      return {
        ...state,
        ...omit(initialState, ["keyword"]),
      };

    case ACTION_TYPES.CLEAR_ALL_FILTER_BY_PAYLOAD:
      return {
        ...state,
        ...action.payload,
      };

    case ACTION_TYPES.CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
};
