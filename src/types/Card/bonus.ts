export interface CardBonusType {
  level: string;
  effect: string;
  maxEffect: string;
}

export interface CardBonusObjectType {
  unique: CardBonusType[];
  support: CardBonusType[];
}
