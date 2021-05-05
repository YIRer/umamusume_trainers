import type { CardNameAndTitleType } from "./nameAndTitle";

export type CardEventChoiceType = {
  description: CardNameAndTitleType;
  result: string;
};

export type CardEventType = {
  title: CardNameAndTitleType;
  eventType: string;
  tags: string[];
  choices: CardEventChoiceType[];
  condition: string;
  __tempID?: string;
};

export type CardEventObjectType = {
  once: CardEventType[];
  multipleTimes: CardEventType[];
  common?: CardEventType[];
};
