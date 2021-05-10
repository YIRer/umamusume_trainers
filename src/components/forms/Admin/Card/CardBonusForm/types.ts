import { CardBonusType, CardBonusObjectType } from "types/Card/bonus";

export const bonusType = "unique" || "support";
export type BonusTypeWithTempID = CardBonusType & {
  __tempID?: string;
};

export type BonusTableProps = {
  data: BonusTypeWithTempID[];
  type: typeof bonusType;
  onDelete: (bonusData: CardBonusType, type: typeof bonusType) => void;
};

export type BonusInputFormProps = {
  initialData?: BonusTypeWithTempID;
  closeForm: () => void;
  onConfirm: (bonusData: BonusTypeWithTempID, isUnique: boolean) => void;
};

export type CardBonusFormProps = {
  initialData?: CardBonusObjectType;
  onChangeBonus: (bonusData: CardBonusObjectType) => void;
};
