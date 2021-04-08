const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;

const skillNameInputType = new GraphQLInputObjectType({
  name: "skillNameInputType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const SkillInputType = new GraphQLInputObjectType({
  name: "SkillInputType",
  fields: () => ({
    name: { type: new GraphQLNonNull(skillNameInputType) },
    targetIDs: { type: new GraphQLList(GraphQLID) },
    effect: { type: new GraphQLNonNull(GraphQLString) },
    imageSrc: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    id: { type: GraphQLID },
    condition: { type: GraphQLString },
  }),
});

const skillNameType = new GraphQLObjectType({
  name: "skillName",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const SkillType = new GraphQLObjectType({
  name: "skill",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: skillNameType },
    targetIDs: { type: new GraphQLList(GraphQLID) },
    effect: { type: GraphQLString },
    imageSrc: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    condition: { type: GraphQLString },
  }),
});

module.exports = { SkillType, SkillInputType };
