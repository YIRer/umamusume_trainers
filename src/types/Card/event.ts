import  { CardNameAndTitleType } from "./nameAndTitle";

export interface CardEventChoiceType {
  description: CardNameAndTitleType;
  result: string;
}

export interface CardEventType {
  title: CardNameAndTitleType;
  eventType: string;
  tags: string[];
  choices: CardEventChoiceType[];
  condition: string;
}

export interface CardEventObjectType {
  once: CardEventType[];
  multipleTimes: CardEventType[];
  common?: CardEventType[];
}
