import { NameAndTitleType } from "types/nameAndTitle";
import { SimpleCardType } from "types/Card/card";

export type SkillType = {
  id: string;
  name: NameAndTitleType;
  // targetIDs: string[];
  relatedCards: SimpleCardType[];
  effect: string;
  imageSrc: string;
  tags: string[];
  condition: string;
};

export type RelatedSkillsType = {
  unique: SkillType[];
  training: SkillType[];
  has: SkillType[];
  base: SkillType[];
  awakening: SkillType[];
};
