export interface CardStatusObject {
  name: string;
  rank: string;
  bonus: string;
}

export interface CardStatus {
  speed: CardStatusObject;
  stamina: CardStatusObject;
  power: CardStatusObject;
  guts: CardStatusObject;
  intelligence: CardStatusObject;
}

export interface CardGroundStatus {
  turf: CardStatusObject;
  duct: CardStatusObject;
}

export interface CardDistanceStatus {
  short: CardStatusObject;
  mile: CardStatusObject;
  medium: CardStatusObject;
  long: CardStatusObject;
}

export interface CardStrategyStatus {
  escape: CardStatusObject;
  leading: CardStatusObject;
  between: CardStatusObject;
  pushing: CardStatusObject;
}

export interface CardStatusObject {
  ground: CardGroundStatus;
  status: CardStatus;
  distance: CardDistanceStatus;
  strategy: CardStrategyStatus;
}
