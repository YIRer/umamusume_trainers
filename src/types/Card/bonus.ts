export type CardBonusType = {
  level: string;
  effect: string;
  maxEffect: string;
};

export type CardBonusObjectType = {
  unique: CardBonusType[];
  support: CardBonusType[];
};
export type CardBonusEffectTableRowType = {
  name: string;
  effects: string[];
};
