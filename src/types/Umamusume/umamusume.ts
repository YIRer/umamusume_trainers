import { NameAndTitleType } from "types/nameAndTitle";
import { CardType } from "types/Card/card";

export type UmamusumeNameType = NameAndTitleType & {
  en?: string;
  default?: string;
};

export type UmamusumeType = {
  id?: string;
  name: UmamusumeNameType;
  imageSrc: string;
  cards: CardType[];
};
