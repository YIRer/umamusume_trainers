import { NameAndTitleType } from "types/nameAndTitle";

export type SkillType = {
  id: string;
  name: NameAndTitleType;
  targetIDs: string[];
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
