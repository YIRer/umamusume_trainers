import { CardNameAndTitleType } from "./nameAndTitle";
import { CardBonusObjectType } from "./bonus";
import { CardEventObjectType } from "./event";
import { CardObjectType } from "./object";
import { CardStatusObject } from "./status";

export interface CardType {
  id: string;
  star: number;
  targetID: string;
  name: CardNameAndTitleType;
  imageSrc: string;
  type: "training" | "support";
  supportType: "speed" | "stamina" | "power" | "guts" | "int" | "friend";
  trainingObjects: CardObjectType[];
  playable: boolean;
  limited: boolean;
  status: CardStatusObject;
  bonus: CardBonusObjectType;
  uniqueSkillsIds: string[];
  trainingSkillsIds: string[];
  hasSkillsIds: string[];
  baseSkillsIds: string[];
  awakeningSkillsIds: string[];
  skills: any[];
  events: CardEventObjectType;
}
