const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLID, GraphQLNonNull, GraphQLList } = graphql;

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
      .post(`${dbServer}/events`, { ...args.input })
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
    return axios({
      method: "patch",
      url: `${dbServer}/events/${id}`,
      data: { ...input },
    }).then((res) => res.data);
  },
};

const editEvents = {
  type: new GraphQLList(EventType),
  args: {
    ids: { type: new GraphQLList(GraphQLID) },
    eventsTargetIDs: {
      type: new GraphQLList(new GraphQLList(GraphQLID)),
    },
  },
  resolve(_parentValue, { ids, eventsTargetIDs }) {
    return Promise.all([
      eventsTargetIDs.map((targetIDs, index) =>
        axios({
          method: "patch",
          url: `${dbServer}/events/${ids[index]}`,
          data: { targetIDs },
        })
      ),
    ]).then((res) => res.data);
  },
};

const deleteEvent = {
  type: EventType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(_parentValue, { id }) {
    return axios
      .delete(`${dbServer}/events/${id}`)
      .then((_res) => ({ deleted: true }));
  },
};

module.exports = { addEvent, editEvent, editEvents, deleteEvent };
