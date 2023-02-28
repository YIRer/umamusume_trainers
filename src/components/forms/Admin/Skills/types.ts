import { RouteComponentProps } from "react-router-dom";

import { iconData } from "./constants";
import { SkillType } from "types/Skill/skill";

export type AddSkillProps = RouteComponentProps & {};
export type EditSkillProps = RouteComponentProps & {};
export type IconRadioGroupsProps = {
  data: typeof iconData;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type skillInputType = {
  ko?: string;
  ja?: string;
  targetIDs?: string[];
  effect?: string;
  condition?: string;
  imageSrc?: string;
  tags?: string;
  evolutionConditions?: string;
};

export type SearchSkills = {
  open: boolean;
  selectedData: SkillType[];
  onSelect: (targets: SkillType[]) => void;
  onClose: () => void;
};
