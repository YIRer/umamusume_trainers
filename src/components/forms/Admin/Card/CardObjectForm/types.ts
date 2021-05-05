import type { CardObjectType } from "types/Card/object";

export type formProps = {
  list: CardObjectType[];
  updateList: (value: CardObjectType[]) => void;
};

export type ItemProps = {
  data: CardObjectType;
  index: number;
  onDelete: (i: number) => void;
  onEdit: (i: number, value: CardObjectType) => void;
};
