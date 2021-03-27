const _ = require("lodash");
const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const {
  GraphQLNonNull,
  GraphQLID,
} = graphql;

const { CardType, CardInputType } = require("../Card.js");

const addCard = {
  type: CardType,
  args: {
    input: { type: CardInputType },
  },
  resolve(_parentValue, { input }) {
    return axios
      .post(`${dbServer}/cards`, { params: { ...input } })
      .then((res) => res.data);
  },
};

const editCard = {
  type: CardType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: CardInputType },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .patch(`${dbServer}/cards/${id}`, { params: { id, ...input } })
      .then((res) => res.data);
  },
};

const deleteCard = {
  type: CardType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, { id }) {
    return axios
      .delete(`${dbServer}/cards/${id}`)
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addCard, editCard, deleteCard };
