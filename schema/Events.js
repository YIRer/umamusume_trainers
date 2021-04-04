const graphql = require("graphql");
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

const EventTilteInputType = new GraphQLInputObjectType({
  name: "EventTilteInputType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const EventInputType = new GraphQLInputObjectType({
  name: "EventInputType",
  fields: () => ({
    title: { type: new GraphQLNonNull(EventTilteInputType) },
    targetIDs: { type: new GraphQLList(GraphQLID) },
    eventType: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    choices: { type: new GraphQLList(EventChoiceInputType) },
    condition: { type: GraphQLString },
  }),
});

const EventChoiceType = new GraphQLObjectType({
  name: "EventChoice",
  fields: () => ({
    description: { type: GraphQLString },
    result: { type: GraphQLString },
  }),
});

const EventTilteType = new GraphQLObjectType({
  name: "EventTilteType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const EventType = new GraphQLObjectType({
  name: "EventType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: EventTilteType },
    targetIDs: { type: new GraphQLList(GraphQLID) },
    eventType: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    choices: { type: new GraphQLList(EventChoiceType) },
    condition: { type: GraphQLString },
  }),
});

module.exports = {
  EventType,
  EventChoiceType,
  EventInputType,
  EventChoiceInputType,
};
