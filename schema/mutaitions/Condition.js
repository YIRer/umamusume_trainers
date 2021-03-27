const _ = require("lodash");
const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull } = graphql;

const { ConditionType, ConditionInputType } = require("../Condition.js");

const addCondition = {
  type: ConditionType,
  args: {
    input: { type: ConditionInputType },
  },
  resolve(_parentValue, { input }) {
    return axios
      .post(`${dbServer}/conditions`, { params: { ...input } })
      .then((res) => res.data);
  },
};

const editCondition = {
  type: ConditionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: ConditionInputType },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .patch(`${dbServer}/conditions/${id}`, { params: { id, ...input } })
      .then((res) => res.data);
  },
};

const deleteCondition = {
  type: ConditionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, args) {
    return axios
      .delete(`${dbServer}/conditions/${args.id}`)
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addCondition, editCondition, deleteCondition };
