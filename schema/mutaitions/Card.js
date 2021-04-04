const _ = require("lodash");
const axios = require("axios");
const graphql = require("graphql");
const { dbServer } = require("../../constants.js");

const { GraphQLNonNull, GraphQLID, GraphQLList } = graphql;

const { CardType, CardInputType } = require("../Card.js");
const { SkillInputType } = require("../Skill.js");

const addCard = {
  type: CardType,
  args: {
    input: { type: CardInputType },
  },
  resolve(_parentValue, { input }) {
    return axios
      .post(`${dbServer}/cards`, { ...input })
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
      .patch(`${dbServer}/cards/${id}`, { ...input })
      .then((res) => res.data);
  },
};

const deleteCard = {
  type: CardType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    skills: { type: new GraphQLList(SkillInputType) },
  },
  resolve(_parentValue, { id, skills = [] }) {
    return Promise.all([
      axios.delete(`${dbServer}/cards/${id}`),
      skills.map((skill) => {
        const removedID = _.remove(skill.targetIDs, id);

        return axios.patch(`${dbServer}/skills/${skill.id}`, {
          ...skill,
          targetIDs: removedID,
        });
      }),
    ]).then((_res) => ({ deleted: true }));
  },
};

module.exports = { addCard, editCard, deleteCard };
