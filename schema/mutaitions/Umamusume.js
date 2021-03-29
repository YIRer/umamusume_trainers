const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull, GraphQLList } = graphql;

const { UmamusumeType, UmamusumeInputType } = require("../Umamusume.js");
const { CardInputType } = require("../Card.js");

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
    cards: { type: new GraphQLList(CardInputType) },
  },
  resolve(_parentValue, { id, cards }) {
    return Promise.all([
      axios.delete(`${dbServer}/umamusume/${id}`),
      cards.map((card) =>
        axios.patch(`${dbServer}/cards/${card.id}`, {
          ...card,
          targetID: null,
        })
      ),
    ]).then((_res) => ({ deleted: true }));
  },
};

module.exports = { addUmamusume, editUmamusume, deleteUmamusume };
