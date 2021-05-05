import  {
  CardEventType,
  CardEventChoiceType,
  CardEventObjectType,
} from "types/Card/event";

import { cardEventTypes } from "../constants";

export interface CardEventTypeWithTempID extends CardEventType {
  __tempID?: string;
}

export interface EventItemsProps {
  eventData: CardEventTypeWithTempID;
  onDelete?: (d: CardEventTypeWithTempID) => void;
  onEdit?: (d: CardEventTypeWithTempID, changedEventType: boolean) => void;
  editable?: boolean;
}

export interface EventTypeRadioGroupsProps {
  data: typeof cardEventTypes;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface EventInputFormProps {
  closeForm: () => void;
  onConfirm: (updatedData: CardEventTypeWithTempID) => void;
  initialData?: CardEventTypeWithTempID;
}

export interface EventChoiceInputProps {
  choiceData?: CardEventChoiceType;
  onConfirmChoice: (data: CardEventChoiceType, choiceIndex: number) => void;
  onDelete: (deleteIndex: number) => void;
  choiceIndex: number;
}

export interface CardEventFormProps {
  onChangeEvents: (eventObject: CardEventObjectType) => void;
  initialData?: CardEventObjectType;
  isTrainingType?: boolean;
}
