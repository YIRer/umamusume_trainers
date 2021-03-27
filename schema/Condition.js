const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;

const ConditionInputType = new GraphQLInputObjectType({
  name: "ConditionInputType",
  fields: () => ({
    description: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ConditionType = new GraphQLObjectType({
  name: "Condition",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
  }),
});

module.exports = { ConditionType, ConditionInputType };
