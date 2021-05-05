import type {
  CardEventType,
  CardEventChoiceType,
  CardEventObjectType,
} from "types/Card/event";

import { cardEventTypes } from "../constants";

export type EventItemsProps = {
  eventData: CardEventType;
  onDelete?: (d: CardEventType) => void;
  onEdit?: (d: CardEventType, changedEventType: boolean) => void;
  editable?: boolean;
};

export type EventTypeRadioGroupsProps = {
  data: typeof cardEventTypes;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type EventInputFormProps = {
  closeForm: () => void;
  onConfirm: (updatedData: CardEventType) => void;
  initialData?: CardEventType;
};

export type EventChoiceInputProps = {
  choiceData?: CardEventChoiceType;
  onConfirmChoice: (data: CardEventChoiceType, choiceIndex: number) => void;
  onDelete: (deleteIndex: number) => void;
  choiceIndex: number;
};

export type CardEventFormProps = {
  onChangeEvents: (eventObject: CardEventObjectType) => void;
  initialData?: CardEventObjectType;
  isTrainingType?: boolean;
};
