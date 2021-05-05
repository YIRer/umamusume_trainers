import  { CardBonusType, CardBonusObjectType } from "types/Card/bonus";

export const bonusType = "unique" || "support";
export interface BonusTypeWithTempID extends CardBonusType {
  __tempID?: string;
}

export interface BonusTableProps {
  data: BonusTypeWithTempID[];
  type: typeof bonusType;
  onDelete: (bonusData: CardBonusType, type: typeof bonusType) => void;
}

export interface BonusInputFormProps {
  initialData?: BonusTypeWithTempID;
  closeForm: () => void;
  onConfirm: (bonusData: BonusTypeWithTempID, isUnique: boolean) => void;
}

export interface CardBonusFormProps {
  initialData?: CardBonusObjectType;
  onChangeBonus: (bonusData: CardBonusObjectType) => void;
}
