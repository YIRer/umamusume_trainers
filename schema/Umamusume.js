const graphql = require("graphql");
const axios = require("axios");
const { dbServer } = require("../constants.js");
const { CardType, CardInputType } = require("./Card.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = graphql;

const UmamusumeNameInputType = new GraphQLInputObjectType({
  name: "UmamusumeNameInputType",
  fields: () => ({
    default: { type: new GraphQLNonNull(GraphQLString) },
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
    en: { type: GraphQLString },
  }),
});

const UmamusumeInputType = new GraphQLInputObjectType({
  name: "UmamusumeInputType",
  fields: () => ({
    name: { type: UmamusumeNameInputType },
    imageSrc: { type: GraphQLString },
    cards: { type: new GraphQLList(CardInputType) },
  }),
});

const UmamusumeNameType = new GraphQLObjectType({
  name: "UmamusumeName",
  fields: () => ({
    default: { type: GraphQLString },
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
    en: { type: GraphQLString },
  }),
});

const UmamusumeType = new GraphQLObjectType({
  name: "Umamusume",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: UmamusumeNameType },
    imageSrc: { type: GraphQLString },
    cards: {
      type: new GraphQLList(CardType),
      resolve(parentValue, _args) {
        return axios
          .get(`${dbServer}/cards`, { params: { targetID: parentValue.id } })
          .then((res) => res.data);
      },
    },
  }),
});

module.exports = {
  UmamusumeType,
  UmamusumeNameType,
  UmamusumeInputType,
  UmamusumeNameInputType,
};
