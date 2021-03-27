const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull } = graphql;

const { EventType, EventInputType } = require("../Events.js");

const addEvent = {
  type: EventType,
  args: {
    input: {
      type: EventInputType,
    },
  },
  resolve(_parentValue, args) {
    return axios
      .post(`${dbServer}/events`, { params: { ...args.input } })
      .then((res) => res.data);
  },
};

const editEvent = {
  type: EventType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: {
      type: EventInputType,
    },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .patch(`${dbServer}/events/${id}`, { params: { id, ...input } })
      .then((res) => res.data);
  },
};

const deleteEvent = {
  type: EventType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, { id, input }) {
    return axios
      .delete(`${dbServer}/events/${id}`, { params: { id, ...input } })
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addEvent, editEvent, deleteEvent };
