const graphql = require("graphql");

const axios = require("axios");
const { dbServer } = require("../constants.js");

const { SkillType, SkillInputType } = require("./Skill.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;

const CardEventChoiceResultsInputType = new GraphQLInputObjectType({
  name: "CardEventChoiceResultsInputType",
  fields: () => ({
    condition: { type: GraphQLString },
    result: { type: GraphQLString },
  }),
});
const CardEventChoiceInputType = new GraphQLInputObjectType({
  name: "CardEventChoiceInputType",
  fields: () => ({
    description: {
      type: new GraphQLNonNull(CardEventTilteAndSelectionInputType),
    },
    result: { type: new GraphQLNonNull(GraphQLString) },
    results: { type: new GraphQLList(CardEventChoiceResultsInputType) },
  }),
});

const CardEventTilteAndSelectionInputType = new GraphQLInputObjectType({
  name: "CardEventTilteAndSelectionInputType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const CardEventObjectInputType = new GraphQLInputObjectType({
  name: "CardEventObjectInputType",
  fields: () => ({
    title: { type: new GraphQLNonNull(CardEventTilteAndSelectionInputType) },
    eventType: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    choices: { type: new GraphQLList(CardEventChoiceInputType) },
    condition: { type: GraphQLString },
  }),
});

const CardEventInputType = new GraphQLInputObjectType({
  name: "CardEventInputType",
  fields: () => ({
    common: { type: new GraphQLList(CardEventObjectInputType) },
    once: { type: new GraphQLList(CardEventObjectInputType) },
    multipleTimes: { type: new GraphQLList(CardEventObjectInputType) },
  }),
});

const StatusObjectInput = new GraphQLInputObjectType({
  name: "StatusObjectInput",
  fields: () => ({
    rank: { type: GraphQLString },
    bonus: { type: GraphQLString },
  }),
});

const CardStatusInput = new GraphQLInputObjectType({
  name: "CardStatusInput",
  fields: () => ({
    speed: { type: StatusObjectInput },
    stamina: { type: StatusObjectInput },
    power: { type: StatusObjectInput },
    guts: { type: StatusObjectInput },
    intelligence: { type: StatusObjectInput },
  }),
});

const CardGroundStatusInput = new GraphQLInputObjectType({
  name: "CardGroundStatusInput",
  fields: () => ({
    turf: { type: StatusObjectInput },
    duct: { type: StatusObjectInput },
  }),
});

const CardDistanceStatusInput = new GraphQLInputObjectType({
  name: "CardDistanceStatusInput",
  fields: () => ({
    short: { type: StatusObjectInput },
    mile: { type: StatusObjectInput },
    medium: { type: StatusObjectInput },
    long: { type: StatusObjectInput },
  }),
});

const CardStrategyStatusInput = new GraphQLInputObjectType({
  name: "CardStrategyStatusInput",
  fields: () => ({
    escape: { type: StatusObjectInput },
    leading: { type: StatusObjectInput },
    between: { type: StatusObjectInput },
    pushing: { type: StatusObjectInput },
  }),
});

const CardStatusObjectInput = new GraphQLInputObjectType({
  name: "CardStatusObjectInput",
  fields: () => ({
    ground: { type: CardGroundStatusInput },
    status: { type: CardStatusInput },
    distance: { type: CardDistanceStatusInput },
    strategy: { type: CardStrategyStatusInput },
  }),
});

const CardNameInputType = new GraphQLInputObjectType({
  name: "CardNameInputType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const CardBonusInputType = new GraphQLInputObjectType({
  name: "CardBonusInputType",
  fields: () => ({
    level: { type: GraphQLString },
    effect: { type: GraphQLString },
    maxEffect: { type: GraphQLString },
  }),
});

const CardBonusObjectType = new GraphQLInputObjectType({
  name: "CardBonusObjectType",
  fields: () => ({
    unique: { type: new GraphQLList(CardBonusInputType) },
    support: { type: new GraphQLList(CardBonusInputType) },
  }),
});

const CardObjectsInputType = new GraphQLInputObjectType({
  name: "CardObjectsInputType",
  fields: () => ({
    object: { type: GraphQLString },
    time: { type: GraphQLString },
    fan: { type: GraphQLString },
    raceCourse: { type: GraphQLString },
  }),
});

const BonusEffectTableRowInput = new GraphQLInputObjectType({
  name: "BonusEffectTableRowInput",
  fields: () => ({
    name: { type: GraphQLString },
    effects: { type: new GraphQLList(GraphQLString) },
  }),
});

const HiddenTitleInput = new GraphQLInputObjectType({
  name: "HiddenTitleInput",
  fields: () => ({
    name: { type: GraphQLString },
    condition: { type: GraphQLString },
    rewards: { type: GraphQLString },
  }),
});

const CardOriginalEffectInput = new GraphQLInputObjectType({
  name: "CardOriginalEffectInput",
  fields: () => ({
    level: { type: GraphQLString },
    effect: { type: GraphQLString },
  }),
});

const CardInputType = new GraphQLInputObjectType({
  name: "CardInputType",
  fields: () => ({
    star: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(CardNameInputType) },
    id: { type: GraphQLID },
    targetID: { type: GraphQLID },
    imageSrc: { type: GraphQLString },
    type: { type: new GraphQLNonNull(GraphQLString) },
    supportType: { type: new GraphQLNonNull(GraphQLString) },
    trainingObjects: { type: new GraphQLList(CardObjectsInputType) },
    playable: { type: new GraphQLNonNull(GraphQLBoolean) },
    limited: { type: new GraphQLNonNull(GraphQLBoolean) },
    status: { type: CardStatusObjectInput },
    bonus: { type: CardBonusObjectType },
    uniqueSkillsIds: { type: new GraphQLList(GraphQLID) },
    trainingSkillsIds: { type: new GraphQLList(GraphQLID) },
    hasSkillsIds: { type: new GraphQLList(GraphQLID) },
    baseSkillsIds: { type: new GraphQLList(GraphQLID) },
    awakeningSkillsIds: { type: new GraphQLList(GraphQLID) },
    skills: {
      type: new GraphQLList(SkillInputType),
    },
    events: {
      type: CardEventInputType,
    },
    originalEffect: { type: CardOriginalEffectInput},
    bonusEffectTable: { type: new GraphQLList(BonusEffectTableRowInput) },
    hiddenTitle: { type: new GraphQLList(HiddenTitleInput) },
  }),
});

const CardEventChoiceResultType = new GraphQLObjectType({
  name: "CardEventChoiceResultType",
  fields: () => ({
    condition: { type: GraphQLString },
    result: { type: GraphQLString },
  }),
});

const CardEventChoiceType = new GraphQLObjectType({
  name: "CardEventChoiceType",
  fields: () => ({
    description: { type: CardEventTilteAndSelectionType },
    result: { type: GraphQLString },
    results: { type: new GraphQLList(CardEventChoiceResultType) },
  }),
});

const CardEventTilteAndSelectionType = new GraphQLObjectType({
  name: "CardEventTilteAndSelectionType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const CardEventObjecType = new GraphQLObjectType({
  name: "CardEventObjecType",
  fields: () => ({
    title: { type: CardEventTilteAndSelectionType },
    eventType: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    choices: { type: new GraphQLList(CardEventChoiceType) },
    condition: { type: GraphQLString },
  }),
});

const CardEventType = new GraphQLObjectType({
  name: "CardEventType",
  fields: () => ({
    common: { type: new GraphQLList(CardEventObjecType) },
    once: { type: new GraphQLList(CardEventObjecType) },
    multipleTimes: { type: new GraphQLList(CardEventObjecType) },
  }),
});

const StatusObject = new GraphQLObjectType({
  name: "StatusObject",
  fields: () => ({
    name: { type: GraphQLString },
    rank: { type: GraphQLString },
    bonus: { type: GraphQLString },
  }),
});

const CardStatus = new GraphQLObjectType({
  name: "CardStatus",
  fields: () => ({
    speed: { type: StatusObject },
    stamina: { type: StatusObject },
    power: { type: StatusObject },
    guts: { type: StatusObject },
    intelligence: { type: StatusObject },
  }),
});

const CardGroundStatus = new GraphQLObjectType({
  name: "CardGroundStatus",
  fields: () => ({
    turf: { type: StatusObject },
    duct: { type: StatusObject },
  }),
});

const CardDistanceStatus = new GraphQLObjectType({
  name: "CardDistanceStatus",
  fields: () => ({
    short: { type: StatusObject },
    mile: { type: StatusObject },
    medium: { type: StatusObject },
    long: { type: StatusObject },
  }),
});

const CardStrategyStatus = new GraphQLObjectType({
  name: "CardStrategyStatus",
  fields: () => ({
    escape: { type: StatusObject },
    leading: { type: StatusObject },
    between: { type: StatusObject },
    pushing: { type: StatusObject },
  }),
});

const CardStatusObject = new GraphQLObjectType({
  name: "CardStatusObject",
  fields: () => ({
    ground: { type: CardGroundStatus },
    status: { type: CardStatus },
    distance: { type: CardDistanceStatus },
    strategy: { type: CardStrategyStatus },
  }),
});

const CardNameType = new GraphQLObjectType({
  name: "CardNameType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const CardBonusType = new GraphQLObjectType({
  name: "CardBonusType",
  fields: () => ({
    level: { type: GraphQLString },
    effect: { type: GraphQLString },
    maxEffect: { type: GraphQLString },
  }),
});

const CardBonusObject = new GraphQLObjectType({
  name: "CardBonusObject",
  fields: () => ({
    unique: { type: new GraphQLList(CardBonusType) },
    support: { type: new GraphQLList(CardBonusType) },
  }),
});

const CardObjectsType = new GraphQLObjectType({
  name: "CardObjectsType",
  fields: () => ({
    object: { type: GraphQLString },
    time: { type: GraphQLString },
    fan: { type: GraphQLString },
    raceCourse: { type: GraphQLString },
  }),
});

const BonusEffectTableRow = new GraphQLObjectType({
  name: "BonusEffectTableRow",
  fields: () => ({
    name: { type: GraphQLString },
    effects: { type: new GraphQLList(GraphQLString) },
  }),
});

const HiddenTitle = new GraphQLObjectType({
  name: "HiddenTitle",
  fields: () => ({
    name: { type: GraphQLString },
    condition: { type: GraphQLString },
    rewards: { type: GraphQLString },
  }),
});

const CardOriginalEffect = new GraphQLObjectType({
  name: "CardOriginalEffect",
  fields: () => ({
    level: { type: GraphQLString },
    effect: { type: GraphQLString },
  }),
});

const CardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    id: { type: GraphQLID },
    star: { type: GraphQLInt },
    targetID: { type: GraphQLID },
    name: { type: CardNameType },
    imageSrc: { type: GraphQLString },
    type: { type: GraphQLString },
    supportType: { type: new GraphQLNonNull(GraphQLString) },
    trainingObjects: { type: new GraphQLList(CardObjectsType) },
    playable: { type: GraphQLBoolean },
    limited: { type: GraphQLBoolean },
    status: { type: CardStatusObject },
    bonus: { type: CardBonusObject },
    uniqueSkillsIds: { type: new GraphQLList(GraphQLID) },
    trainingSkillsIds: { type: new GraphQLList(GraphQLID) },
    hasSkillsIds: { type: new GraphQLList(GraphQLID) },
    baseSkillsIds: { type: new GraphQLList(GraphQLID) },
    awakeningSkillsIds: { type: new GraphQLList(GraphQLID) },
    skills: {
      type: new GraphQLList(SkillType),
      resolve(parentValue, _args) {
        const {
          uniqueSkillsIds = [],
          trainingSkillsIds = [],
          hasSkillsIds = [],
          baseSkillsIds = [],
          awakeningSkillsIds = [],
        } = parentValue;

        const skillIds = [
          ...uniqueSkillsIds,
          ...trainingSkillsIds,
          ...hasSkillsIds,
          ...baseSkillsIds,
          ...awakeningSkillsIds,
        ]
          .map((id) => `id=${id}`)
          .join("&");

        return axios
          .get(`${dbServer}/skills?${skillIds}`)
          .then((res) => res.data)
          .catch((_err) => []);
      },
    },
    events: {
      type: CardEventType,
    },
    originalEffect: { type: CardOriginalEffect },
    bonusEffectTable: { type: new GraphQLList(BonusEffectTableRow) },
    hiddenTitle: { type: new GraphQLList(HiddenTitle) },
  }),
});

module.exports = { CardType, CardInputType };
