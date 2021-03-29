const graphql = require("graphql");

const axios = require("axios");
const { dbServer } = require("../constants.js");

const { SkillType, SkillTypeInputType } = require("./Skill.js");
const { EventType, EventInputType } = require("./Events.js");

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

const StatusObjectInput = new GraphQLInputObjectType({
  name: "StatusObjectInput",
  fields: () => ({
    name: { type: GraphQLString },
    rank: { type: GraphQLString },
    bonus: { type: GraphQLInt },
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
    grass: { type: StatusObjectInput },
    duct: { type: StatusObjectInput },
  }),
});

const CardStatusObjectInput = new GraphQLInputObjectType({
  name: "CardStatusObjectInput",
  fields: () => ({
    ground: { type: CardGroundStatusInput },
    status: { type: CardStatusInput },
  }),
});

const CardInputType = new GraphQLInputObjectType({
  name: "CardInputType",
  fields: () => ({
    star: { type: new GraphQLNonNull(GraphQLInt) },
    id: { type: GraphQLID },
    targetID: { type: GraphQLID },
    imageSrc: { type: GraphQLString },
    type: { type: new GraphQLNonNull(GraphQLString) },
    playable: { type: new GraphQLNonNull(GraphQLBoolean) },
    limited: { type: new GraphQLNonNull(GraphQLBoolean) },
    status: { type: CardStatusObjectInput },
    skills: {
      type: new GraphQLList(SkillTypeInputType),
    },
    events: {
      type: new GraphQLList(EventInputType),
    },
  }),
});

const StatusObject = new GraphQLObjectType({
  name: "StatusObject",
  fields: () => ({
    name: { type: GraphQLString },
    rank: { type: GraphQLString },
    bonus: { type: GraphQLInt },
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
    grass: { type: StatusObject },
    duct: { type: StatusObject },
  }),
});

const CardStatusObject = new GraphQLObjectType({
  name: "CardStatusObject",
  fields: () => ({
    ground: { type: CardGroundStatus },
    status: { type: CardStatus },
  }),
});

const CardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    id: { type: GraphQLID },
    star: { type: GraphQLInt },
    targetID: { type: GraphQLID },
    imageSrc: { type: GraphQLString },
    type: { type: GraphQLString },
    playable: { type: GraphQLBoolean },
    limited: { type: GraphQLBoolean },
    status: { type: CardStatusObject },
    skills: {
      type: new GraphQLList(SkillType),
      resolve(parentValue, _args) {
        return axios
          .get(`${dbServer}/skills`, { targetID: parentValue.targetID })
          .then((res) => res.data)
          .catch((_err) => []);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parentValue, _args) {
        return axios
          .get(`${dbServer}/events`, { targetID: parentValue.targetID })
          .then((res) => res.data)
          .catch((_err) => []);
      },
    },
  }),
});

module.exports = { CardType, CardInputType };
