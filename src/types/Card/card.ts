import { NameAndTitleType } from "types/nameAndTitle";
import { CardBonusObjectType } from "./bonus";
import { CardEventObjectType } from "./event";
import { CardObjectType } from "./object";
import { CardStatusObject } from "./status";

export type TypeOfCard = "training" | "support";
export type TypeOfSupportCard =
  | "speed"
  | "stamina"
  | "power"
  | "guts"
  | "intelligence"
  | "";

export type CardType = {
  id: string;
  star: number;
  targetID: string;
  name: NameAndTitleType;
  imageSrc: string;
  type: TypeOfCard;
  supportType: TypeOfSupportCard;
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
};

export type SimpleCardType = Pick<
  CardType,
  | "id"
  | "star"
  | "targetID"
  | "name"
  | "imageSrc"
  | "type"
  | "supportType"
  | "playable"
  | "limited"
>;

export type HiddenTitle = {
  name: string;
  condition: string;
  rewards: string;
}

export type BonusEffectTableRow = {
  name: string;
  effects: string[];
}