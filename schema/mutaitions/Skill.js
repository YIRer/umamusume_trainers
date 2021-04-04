const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull, GraphQLList } = graphql;

const { SkillType, SkillInputType } = require("../Skill.js");

const addSkill = {
  type: SkillType,
  args: {
    input: {
      type: SkillInputType,
    },
  },
  resolve(_parentValue, { input }) {
    return axios
      .post(`${dbServer}/skills`, { ...input })
      .then((res) => res.data);
  },
};

const editSkill = {
  type: SkillType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: {
      type: SkillInputType,
    },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .patch(`${dbServer}/skills/${id}`, { ...input })
      .then((res) => res.data);
  },
};

const editSkills = {
  type: new GraphQLList(SkillType),
  args: {
    addIds: { type: new GraphQLList(GraphQLID) },
    addTargetIDs: {
      type: new GraphQLList(new GraphQLList(GraphQLID)),
    },
    deleteIds: { type: new GraphQLList(GraphQLID) },
    deleteTargetIDs: {
      type: new GraphQLList(new GraphQLList(GraphQLID)),
    },
  },
  resolve(
    _parentValue,
    { addIds = [], addTargetIDs = [], deleteIds = [], deleteTargetIDs = [] }
  ) {
    return Promise.all([
      addTargetIDs.map((targetIDs, index) =>
        axios.patch(`${dbServer}/skills/${addIds[index]}`, { targetIDs })
      ),
      deleteTargetIDs.map((targetIDs, index) =>
        axios.patch(`${dbServer}/skills/${deleteIds[index]}`, { targetIDs })
      ),
    ]).then((res) => res.data);
  },
};

const deleteSkill = {
  type: SkillType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, { id }) {
    return axios
      .delete(`${dbServer}/skills/${id}`)
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addSkill, editSkill, editSkills, deleteSkill };
