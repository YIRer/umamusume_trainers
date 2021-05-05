import  { CardObjectType } from "types/Card/object";

export interface formProps {
  list: CardObjectType[];
  updateList: (value: CardObjectType[]) => void;
}

export interface ItemProps {
  data: CardObjectType;
  index: number;
  onDelete: (i: number) => void;
  onEdit: (i: number, value: CardObjectType) => void;
}
