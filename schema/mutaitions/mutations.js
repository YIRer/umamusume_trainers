const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

const UmamusumeMutations = require("./Umamusume.js");
const CardMutations = require("./Card.js");
const EventMutations = require("./Events.js");
const SkillMutations = require("./Skill.js");
const ConditionMutations = require("./Condition.js");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...UmamusumeMutations,
    ...CardMutations,
    ...EventMutations,
    ...SkillMutations,
    ...ConditionMutations,
  },
});

module.exports = mutation;
