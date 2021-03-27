const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;

const SkillTypeInputType = new GraphQLInputObjectType({
  name: "SkillInputType",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    targetID: { type: new GraphQLNonNull(GraphQLID) },
    effect: { type: new GraphQLNonNull(GraphQLString) },
    imageSrc: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

const SkillType = new GraphQLObjectType({
  name: "skill",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    targetID: { type: GraphQLID },
    effect: { type: GraphQLString },
    imageSrc: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = { SkillType, SkillTypeInputType };
