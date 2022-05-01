import { RouteComponentProps } from "react-router-dom";
import {
  CardStatus,
  CardGroundStatus,
  CardDistanceStatus,
  CardStrategyStatus,
} from "types/Card/status";

import { UmamusumeType } from "types/Umamusume/umamusume";
import { CardEventObjectType } from "types/Card/event";
import {
  CardBonusObjectType,
  CardBonusEffectTableRowType,
} from "types/Card/bonus";
import { CardObjectType } from "types/Card/object";
import { TypeOfCard, TypeOfSupportCard, HiddenTitle } from "types/Card/card";

import { CardType } from "types/Card/card";
import { RelatedSkillsType } from "types/Skill/skill";

export type AddCardProps = RouteComponentProps & {};
export type EditCardProps = RouteComponentProps & {};

export type SkillIconsProps = {
  name: {
    ko?: string;
    ja: string;
  };
  imageSrc: string;
  effect: string;
};

export type CardStatusData = CardStatus &
  CardGroundStatus &
  CardDistanceStatus &
  CardStrategyStatus;

export type CardStatusProps = {
  data: CardStatusData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type SearchCards = {
  open: boolean;
  onSelect: (cards: CardType[]) => void;
  onClose: () => void;
  selectedData: CardType[];
};

export type SearchCardItem = {
  itemData: CardType;
  classes: { [x: string]: string };
  selectFn: (card: CardType, isSelected: boolean) => void;
  targets: CardType[];
};

export type CardTargetType = UmamusumeType;

export type TrainingObjectsType = CardObjectType[];
export type FormDataType = {
  ko: string;
  ja: string;
  star: number;
  targetID: string;
  imageSrc: string;
  type: TypeOfCard;
  playable: boolean;
  supportType: TypeOfSupportCard;
  limited: boolean;
  events: CardEventObjectType;
  bonus: CardBonusObjectType;
  imageName?: string;
  hiddenTitle?: HiddenTitle[];
  bonusEffectTable?: CardBonusEffectTableRowType[];
};

export type SelectedSkillTypes = keyof RelatedSkillsType | "";
