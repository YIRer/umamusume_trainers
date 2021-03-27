const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull } = graphql;

const { SkillType, SkillTypeInputType } = require("../Skill.js");

const addSkill = {
  type: SkillType,
  args: {
    input: {
      type: SkillTypeInputType,
    },
  },
  resolve(_parentValue, args) {
    return axios
      .post(`${dbServer}/skills`, { params: { ...args } })
      .then((res) => res.data);
  },
};

const editSkill = {
  type: SkillType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: {
      type: SkillTypeInputType,
    },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .patch(`${dbServer}/skills/${id}`, { params: { id, ...input } })
      .then((res) => res.data);
  },
};

const deleteSkill = {
  type: SkillType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, { id }) {
    return axios
      .post(`${dbServer}/skills/${id}`)
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addSkill, editSkill, deleteSkill };
