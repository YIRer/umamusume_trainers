export type CardBonusType = {
  level: string;
  effect: string;
  maxEffect: string;
};

export type CardBonusObjectType = {
  unique: CardBonusType[];
  support: CardBonusType[];
};
export type CardOriginalEffectType = {
  level: string;
  effect: string;
};
export type CardBonusEffectTableRowType = {
  name: string;
  effects: string[];
};
