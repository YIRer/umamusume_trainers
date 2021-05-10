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
