const _ = require("lodash");
const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../constants.js");

const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

const mutation = require("./mutaitions/mutations.js");

const { UmamusumeType } = require("./Umamusume.js");
const { CardType } = require("./Card.js");
const { EventType } = require("./Events.js");
const { SkillType } = require("./Skill.js");
const { ConditionType } = require("./Condition.js");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    umamusumeList: {
      type: new GraphQLList(UmamusumeType),
      args: {},
      resolve(_parentValue) {
        return axios.get(`${dbServer}/umamusume`).then((res) => res.data);
      },
    },
    umamusume: {
      type: UmamusumeType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_parentValue, { id, targetID }) {
        return axios
          .get(`${dbServer}/umamusume/${id}`, { targetID })
          .then((res) => res.data);
      },
    },
    cards: {
      type: new GraphQLList(CardType),
      args: {},
      resolve(_parentValue) {
        return axios.get(`${dbServer}/cards`).then((res) => res.data);
      },
    },
    card: {
      type: CardType,
      args: { id: { type: GraphQLID }, targetID: { type: GraphQLID } },
      resolve(_parentValue, { id, targetID }) {
        return axios
          .get(`${dbServer}/cards/${id}`, { targetID })
          .then((res) => res.data);
      },
    },
    findCards: {
      type: new GraphQLList(CardType),
      args: { ids: { type: new GraphQLList(GraphQLID) } },
      resolve(_parentValue, { ids }) {
        const query = ids.map((id) => `id_like=${id}`).join("&");

        return axios.get(`${dbServer}/cards?${query}`).then((res) => res.data);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      args: {},
      resolve(_parentValue) {
        return axios.get(`${dbServer}/events`).then((res) => res.data);
      },
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue, { id, targetID }) {
        return axios
          .get(`${dbServer}/events/${id}`, { targetID })
          .then((res) => res.data);
      },
    },
    skills: {
      type: new GraphQLList(SkillType),
      args: {},
      resolve(_parentValue) {
        return axios.get(`${dbServer}/skills`).then((res) => res.data);
      },
    },
    skill: {
      type: SkillType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue, { id }) {
        return axios.get(`${dbServer}/skills/${id}`).then((res) => res.data);
      },
    },
    conditions: {
      type: new GraphQLList(ConditionType),
      args: {},
      resolve(_parentValue) {
        return axios.get(`${dbServer}/conditions`).then((res) => res.data);
      },
    },
    condition: {
      type: ConditionType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue, { id, targetID }) {
        return axios
          .get(`${dbServer}/conditions/${id}`, { targetID })
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
