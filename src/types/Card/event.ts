import { NameAndTitleType } from "types/nameAndTitle";

export type CardEventChoiceType = {
  description: NameAndTitleType;
  result: string;
};

export type CardEventType = {
  title: NameAndTitleType;
  eventType: string;
  tags: string[];
  choices: CardEventChoiceType[];
  condition: string;
};

export type CardEventObjectType = {
  once: CardEventType[];
  multipleTimes: CardEventType[];
  common?: CardEventType[];
};
