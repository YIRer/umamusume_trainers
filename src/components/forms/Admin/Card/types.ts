import { RouteComponentProps } from "react-router-dom";
import {
  CardStatus,
  CardGroundStatus,
  CardDistanceStatus,
  CardStrategyStatus,
} from "types/Card/status";

import { CardType } from "types/Card/card";

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
