import { SeachFilterStateType } from "./SearchReducers";

export type FilterUpdateFnType = ({
  type,
  payload,
  checked,
}: {
  type: string;
  payload?: string | number | boolean;
  checked?: boolean;
}) => void;

export type SeachFilterOptionItemType = {
  type: string;
  selector: "checkbox" | "radio";
  values: Array<string | number | boolean>;
  labels: Array<string>;
  imgSrc?: Array<string>;
};

export type SeachFilterOptionMap = {
  Card: {
    [key in SeachFilterCardStateKey]: SeachFilterOptionItemType;
  };
  Skill: {
    [key in SeachFilterSkillStateKey]: SeachFilterOptionItemType;
  };
};
export type SeachFilterCardStateKey =
  | "rarity"
  | "types"
  | "supportTypes"
  | "limited";

export type SeachFilterSkillStateKey =
  | "skillRarity"
  | "skillDistance"
  | "skillStrategy";

export type FilterRenderHelperProps = {
  data: Partial<SeachFilterStateType>;
  searchOption: SeachFilterOptionItemType;
  onChange: FilterUpdateFnType;
  searchType: "Umamusume" | "Card" | "Skill";
  optionKey: SeachFilterCardStateKey | SeachFilterSkillStateKey;
  conditionProps: {
    [k: string]: any;
  };
};

export type SearchFilterProps = {
  searchOptions: SeachFilterStateType;
  searchType: "Umamusume" | "Card" | "Skill";
  handleOnChange: FilterUpdateFnType;
  hideFilter: () => void;
  onClear?: () => void;
  showBottomControl?: boolean;
  hideOption?: string;
};

export type FilterControlType = {
  onChange: FilterUpdateFnType;
  hideFilter: () => void;
  onClear?: () => void;
};

export type RadioFilterType = {
  data: Partial<SeachFilterStateType>;
  options: SeachFilterOptionItemType;
  onChange: FilterUpdateFnType;
  optionKey: SeachFilterCardStateKey | SeachFilterSkillStateKey;
};

export type RadioFilterItemType = {
  checked: boolean;
  value: string | number | boolean;
  label: string;
  onChange: FilterUpdateFnType;
  optionKey: SeachFilterCardStateKey | SeachFilterSkillStateKey;
};

export type CheckboxFilterType = Pick<
  FilterRenderHelperProps,
  "data" | "onChange" | "conditionProps" | "searchType"
> & {
  options: SeachFilterOptionItemType;
  optionKey: SeachFilterCardStateKey | SeachFilterSkillStateKey;
};

export type CheckboxFilterItemType = Pick<
  FilterRenderHelperProps,
  "searchType"
> & {
  checked: boolean;
  value: string | number | boolean;
  label: string;
  onChange: FilterUpdateFnType;
  optionKey: SeachFilterCardStateKey | SeachFilterSkillStateKey;
  disabled: boolean;
  imgSrc: string;
  classes: {
    [k: string]: any;
  };
};
