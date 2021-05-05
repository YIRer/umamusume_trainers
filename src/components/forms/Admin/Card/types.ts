import { RouteComponentProps } from "react-router-dom";
import {
  CardStatus,
  CardGroundStatus,
  CardDistanceStatus,
  CardStrategyStatus,
} from "types/Card/status";

import { CardType } from "types/Card/card";

export interface AddCardProps extends RouteComponentProps {}
export interface EditCardProps extends RouteComponentProps {}

export interface SkillIconsProps {
  name: {
    ko?: string;
    ja: string;
  };
  imageSrc: string;
  effect: string;
}

export interface CardStatusData
  extends CardStatus,
    CardGroundStatus,
    CardDistanceStatus,
    CardStrategyStatus {}

export interface CardStatusProps {
  data: CardStatusData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchCards {
  open: boolean;
  onSelect: (cards: CardType[]) => void;
  onClose: () => void;
  selectedData: CardType[];
}

export interface SearchCardItem {
  itemData: CardType;
  classes: { [x: string]: string };
  selectFn: (card: CardType, isSelected: boolean) => void;
  targets: CardType[];
}
