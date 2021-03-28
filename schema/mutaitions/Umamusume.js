const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull } = graphql;

const { UmamusumeType, UmamusumeInputType } = require("../Umamusume.js");

const addUmamusume = {
  type: UmamusumeType,
  args: {
    input: {
      type: UmamusumeInputType,
    },
  },
  resolve(_parentValue, { input }) {
    return axios
      .post(`${dbServer}/umamusume`, {
        ...input,
      })
      .then((res) => res.data);
  },
};

const editUmamusume = {
  type: UmamusumeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: {
      type: UmamusumeInputType,
    },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .patch(`${dbServer}/umamusume/${id}`, { ...input })
      .then((res) => res.data);
  },
};

const deleteUmamusume = {
  type: UmamusumeType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .delete(`${dbServer}/umamusume/${id}`)
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addUmamusume, editUmamusume, deleteUmamusume };
