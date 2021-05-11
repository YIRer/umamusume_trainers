import { SkillType, RelatedSkillsType } from "types/Skill/skill";
import { CardType, TypeOfCard } from "types/Card/card";
import { ReactCookieProps } from "react-cookie";

export type CardInfoProps = {
  rootRef?: React.RefObject<HTMLLIElement>;
  showSelection?: boolean;
  skillData: RelatedSkillsType;
  data: CardType;
};

export type CardInfoModalProps = {
  open: boolean;
  showSelection?: boolean;
  data: CardType;
  onClose: () => void;
};

export type SearchCardsProps = {
  open: boolean;
  selectedData: CardType[];
  data: CardType[];
  type: TypeOfCard | "";
  onSelect: (targets: CardType[]) => void;
  onClose: () => void;
};

export type SkillModalProps = {
  open: boolean;
  onClose: () => void;
  data: SkillType;
};

export type DeckType = {
  training: CardType[];
  support: CardType[];
};

export type DeckWithID = TargetWithID<DeckType>;

export type TargetWithID<T> = T & {
  id?: string;
};

export type DeckFormProps = ReactCookieProps & {
  initData?: DeckWithID;
  data: CardType[];
  onSubmit: (data: DeckWithID) => void;
  showClickedCardInfo: (card: CardType, isShowSelection?: boolean) => void;
};

export type DeckSlotProps = {
  data: DeckWithID;
  id?: string;
  index: number;
  cardsData: CardType[];
  onEdit: (deck: DeckWithID) => void;
  onDelete: (id: string) => void;
  showClickedCardInfo: (card: CardType, isShowSelection?: boolean) => void;
};

export type DeckCardListProps = {
  data: DeckWithID;
  showClickedCardInfo: (card: CardType, isShowSelection?: boolean) => void;
};

export type DeckSelectionsProps = {
  data: DeckWithID;
  showClickedCardInfo: (card: CardType, isShowSelection?: boolean) => void;
};

export type DeckSkillItemProps = {
  data: CardType;
  onSelectSkill: (skill: SkillType) => void;
  showClickedCardInfo: (card: CardType, isShowSelection?: boolean) => void;
};
