const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull } = graphql;

const { BuffsType, BuffsInputType } = require("../Buffs.js");

const addBuff = {
  type: BuffsType,
  args: {
    input: { type: BuffsInputType },
  },
  resolve(_parentValue, { input }) {
    return axios
      .post(`${dbServer}/buffs`, { ...input })
      .then((res) => res.data);
  },
};

const editBuff = {
  type: BuffsType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: BuffsInputType },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .patch(`${dbServer}/buffs/${id}`, { ...input })
      .then((res) => res.data);
  },
};

const deleteBuff = {
  type: BuffsType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, args) {
    return axios
      .delete(`${dbServer}/buffs/${args.id}`)
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addBuff, editBuff, deleteBuff };
