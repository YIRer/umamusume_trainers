import { isDev } from "../constants";

import { UmamusumeType } from "types/Umamusume/umamusume";
import { SkillType } from "types/Skill/skill";
import { CardType } from "types/Card/card";
import { CardBonusType } from "types/Card/bonus";
import { SeachFilterStateType } from "components/Search/SearchReducers";

export type FilterFnType<T> = (
  item: T,
  searchOptions: SeachFilterStateType
) => boolean;

export type FilterHelperType = (
  filterFns: FilterFnType<UmamusumeType | SkillType | CardType>[]
) => (
  data: Array<UmamusumeType | SkillType | CardType>,
  searchOptions: SeachFilterStateType
) => Array<UmamusumeType | SkillType | CardType>;

export type SearchFilterFnType = (args: {
  data: Array<UmamusumeType | SkillType | CardType>;
  searchOptions: SeachFilterStateType;
}) => Array<UmamusumeType | SkillType | CardType>;

const IMAGE_URL = "https://umamusume-trainers.s3.ap-northeast-2.amazonaws.com";

export const getTypeName = (skilType: string): string => {
  switch (skilType) {
    case "unique":
      return "고유 스킬";
    case "has":
      return "소지 스킬";

    default:
      return "육성 스킬";
  }
};

export const convertLevel = (item: CardBonusType): string => {
  switch (item.level) {
    case "none":
      return "없음";

    default:
      return `${item.level} ~`;
  }
};

export const isMobile = (): boolean => {
  if (!document || !document.body) {
    return false;
  }
  return document.body.clientWidth < 600;
};

export const prefixImgSrc = (url: string): string => {
  if (isDev) {
    return url;
  } else {
    return IMAGE_URL + url;
  }
};

export const filterCardRarity: FilterFnType<CardType> = (
  item,
  searchOptions
) => {
  const { star } = item;
  if (searchOptions.rarity.length === 0) {
    return true;
  }

  return searchOptions.rarity.includes(star);
};

export const filterPlayable: FilterFnType<CardType> = (item, searchOptions) => {
  const { type } = item;
  if (searchOptions.types === "none") {
    return true;
  }

  return type === searchOptions.types;
};

export const filterSupportType: FilterFnType<CardType> = (
  item,
  searchOptions
) => {
  const { supportType } = item;

  if (searchOptions.supportTypes.length === 0) {
    return true;
  }

  return searchOptions.supportTypes.includes(supportType);
};

export const filterLimited: FilterFnType<CardType> = (item, searchOptions) => {
  const { limited } = item;
  if (searchOptions.limited === "none") {
    return true;
  }
  return limited === searchOptions.limited;
};

export const filterSKillRarity: FilterFnType<SkillType> = (
  item,
  searchOptions
) => {
  const { imageSrc } = item;
  if (searchOptions.skillRarity.length === 0) {
    return true;
  }

  return searchOptions.skillRarity.some((rarity) => {
    return imageSrc.includes(rarity);
  });
};

export const filterSKillDistance: FilterFnType<SkillType> = (
  item,
  searchOptions
) => {
  const { tags } = item;
  if (searchOptions.skillDistance.length === 0) {
    return true;
  }

  return searchOptions.skillDistance.some((distance) => {
    return tags.includes(distance);
  });
};

export const filterSKillStrategy: FilterFnType<SkillType> = (
  item,
  searchOptions
) => {
  const { tags } = item;
  if (searchOptions.skillStrategy.length === 0) {
    return true;
  }
  return searchOptions.skillStrategy.some((strategy) => {
    return tags.includes(strategy);
  });
};

export const filterSKillGroundType: FilterFnType<SkillType> = (
  item,
  searchOptions
) => {
  const { tags } = item;
  if (!searchOptions.skillGroundType || searchOptions.skillGroundType === 'turf') {
    return true;
  }
  return tags.includes('더트');;
};

export const filterKeywords: FilterFnType<
  UmamusumeType | CardType | SkillType
> = (item, searchOptions) => {
  const { name } = item;
  return (
    name?.ko?.includes(searchOptions.keyword) ||
    name?.ja?.includes(searchOptions.keyword)
  );
};

export const filterHelepr: FilterHelperType =
  (filterFns) => (data, searchOptions) => {
    return data.filter((item) => {
      return filterFns.every((filterFn) => filterFn(item, searchOptions));
    });
  };

export const searchUmamusumeHelper: SearchFilterFnType = ({
  data,
  searchOptions,
}) => {
  return filterHelepr([filterKeywords])(data, searchOptions);
};

export const searchCardsHelper: SearchFilterFnType = ({
  data,
  searchOptions,
}) => {
  return filterHelepr([
    filterKeywords,
    filterCardRarity,
    filterPlayable,
    filterSupportType,
    filterLimited,
  ])(data, searchOptions);
};

export const searchSkillsHelper: SearchFilterFnType = ({
  data,
  searchOptions,
}) => {
  return filterHelepr([
    filterKeywords,
    filterSKillRarity,
    filterSKillDistance,
    filterSKillStrategy,
    filterSKillGroundType
  ])(data, searchOptions);
};

export const getGhlErrorStatus = (err): number => {
  try {
    const status = Number(err.graphQLErrors[0].message.split(" ").pop());
    if (isNaN(status)) {
      return 500;
    }
    return status;
  } catch (_e) {
    return 500;
  }
};
