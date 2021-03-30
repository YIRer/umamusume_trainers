const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;

const SkillInputType = new GraphQLInputObjectType({
  name: "SkillInputType",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    targetIDs: { type: new GraphQLList(GraphQLID) },
    effect: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    imageSrc: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    id: { type: GraphQLID },
  }),
});

const SkillType = new GraphQLObjectType({
  name: "skill",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    targetIDs: { type: new GraphQLList(GraphQLID) },
    effect: { type: GraphQLString },
    imageSrc: { type: GraphQLString },
    type: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = { SkillType, SkillInputType };
