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

const CardInputType = new GraphQLInputObjectType({
  name: "CardInputType",
  fields: () => ({
    star: { type: new GraphQLNonNull(GraphQLInt) },
    targetID: { type: GraphQLString },
    imageSrc: { type: GraphQLString },
    type: { type: new GraphQLNonNull(GraphQLString) },
    playable: { type: new GraphQLNonNull(GraphQLBoolean) },
    limited: { type: new GraphQLNonNull(GraphQLBoolean) },
    skills: {
      type: new GraphQLList(SkillTypeInputType),
    },
    events: {
      type: new GraphQLList(EventInputType),
    },
  }),
});

const CardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    id: { type: GraphQLID },
    star: { type: GraphQLInt },
    targetID: { type: GraphQLString },
    imageSrc: { type: GraphQLString },
    type: { type: GraphQLString },
    playable: { type: GraphQLBoolean },
    limited: { type: GraphQLBoolean },
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
