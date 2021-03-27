const graphql = require("graphql");
const axios = require("axios");
const { dbServer } = require("../constants.js");
const { ConditionType, ConditionInputType } = require("./Condition.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;

const EventChoiceInputType = new GraphQLInputObjectType({
  name: "EventChoiceInputType",
  fields: () => ({
    description: { type: new GraphQLNonNull(GraphQLString) },
    result: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
const EventObjectInputType = new GraphQLInputObjectType({
  name: "EventObjectInputType",
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    conditionID: { type: GraphQLString },
    condition: { type: ConditionInputType },
    tags: { type: new GraphQLList(EventChoiceInputType) },
    choices: { type: new GraphQLList(EventChoiceInputType) },
  }),
});

const EventInputType = new GraphQLInputObjectType({
  name: "EventInputType",
  fields: () => ({
    targetID: { type: new GraphQLNonNull(GraphQLString) },
    oneTime: { type: new GraphQLList(EventObjectInputType) },
    multiTimes: { type: new GraphQLList(EventObjectInputType) },
  }),
});

const EventChoiceType = new GraphQLObjectType({
  name: "EventChoice",
  fields: () => ({
    description: { type: GraphQLString },
    result: { type: GraphQLString },
  }),
});

const EventObject = new GraphQLObjectType({
  name: "EventObject",
  fields: () => ({
    title: { type: GraphQLString },
    conditionID: { type: GraphQLString },
    condition: {
      type: ConditionType,
      resolve(parentValue, _args) {
        return axios
          .get(`${dbServer}/conditions/${parentValue.conditionID}`)
          .then((res) => res.data)
          .catch((_err) => null);
      },
    },
    tags: { type: new GraphQLList(GraphQLString) },
    choices: { type: new GraphQLList(EventChoiceType) },
  }),
});

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    targetID: { type: GraphQLString },
    oneTime: { type: new GraphQLList(EventObject) },
    multiTimes: { type: new GraphQLList(EventObject) },
  }),
});

module.exports = {
  EventType,
  EventObject,
  EventChoiceType,
  EventInputType,
  EventObjectInputType,
  EventChoiceInputType,
};
