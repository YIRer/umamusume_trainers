export type CardStatusDetailObject = {
  name: string;
  rank: string;
  bonus: string;
};

export type CardStatus = {
  speed: CardStatusDetailObject;
  stamina: CardStatusDetailObject;
  power: CardStatusDetailObject;
  guts: CardStatusDetailObject;
  intelligence: CardStatusDetailObject;
};

export type CardGroundStatus = {
  turf: CardStatusDetailObject;
  duct: CardStatusDetailObject;
};

export type CardDistanceStatus = {
  short: CardStatusDetailObject;
  mile: CardStatusDetailObject;
  medium: CardStatusDetailObject;
  long: CardStatusDetailObject;
};

export type CardStrategyStatus = {
  escape: CardStatusDetailObject;
  leading: CardStatusDetailObject;
  between: CardStatusDetailObject;
  pushing: CardStatusDetailObject;
};

export type CardStatusObject = {
  ground: CardGroundStatus;
  status: CardStatus;
  distance: CardDistanceStatus;
  strategy: CardStrategyStatus;
};
