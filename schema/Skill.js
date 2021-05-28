const graphql = require("graphql");
const axios = require("axios");
const { dbServer } = require("../constants.js");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;

const skillNameInputType = new GraphQLInputObjectType({
  name: "skillNameInputType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const SkillInputType = new GraphQLInputObjectType({
  name: "SkillInputType",
  fields: () => ({
    name: { type: new GraphQLNonNull(skillNameInputType) },
    // targetIDs: { type: new GraphQLList(GraphQLID) },
    effect: { type: new GraphQLNonNull(GraphQLString) },
    imageSrc: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    id: { type: GraphQLID },
    condition: { type: GraphQLString },
  }),
});

const skillNameType = new GraphQLObjectType({
  name: "skillName",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const SimpleCardNameType = new GraphQLObjectType({
  name: "SimpleCardNameType",
  fields: () => ({
    ko: { type: GraphQLString },
    ja: { type: GraphQLString },
  }),
});

const SimpleCardType = new GraphQLObjectType({
  name: "SimpleCardType",
  fields: () => ({
    id: { type: GraphQLID },
    star: { type: GraphQLInt },
    targetID: { type: GraphQLID },
    name: { type: SimpleCardNameType },
    imageSrc: { type: GraphQLString },
    type: { type: GraphQLString },
    supportType: { type: new GraphQLNonNull(GraphQLString) },
    playable: { type: GraphQLBoolean },
    limited: { type: GraphQLBoolean },
  }),
});

const SkillType = new GraphQLObjectType({
  name: "skill",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: skillNameType },
    // targetIDs: { type: new GraphQLList(GraphQLID) },
    effect: { type: GraphQLString },
    imageSrc: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    condition: { type: GraphQLString },

    relatedCards: {
      type: new GraphQLList(SimpleCardType),
      resolve(parentValue, _args) {
        return Promise.allSettled([
          axios.get(`${dbServer}/cards?uniqueSkillsIds_like=${parentValue.id}`),
          axios.get(
            `${dbServer}/cards?trainingSkillsIds_like=${parentValue.id}`
          ),
          axios.get(`${dbServer}/cards?hasSkillsIds_like=${parentValue.id}`),
          axios.get(`${dbServer}/cards?baseSkillsIds_like=${parentValue.id}`),
          axios.get(
            `${dbServer}/cards?awakeningSkillsIds_like=${parentValue.id}`
          ),
        ])
          .then((res) => {
            const cards = [];
            const strID = parentValue.id.toString();
            res.forEach(({ value }) => {
              if (value.data.length > 0) {
                const relatedCards = [];

                value.data.forEach((card) => {
                  const {
                    uniqueSkillsIds = [],
                    trainingSkillsIds = [],
                    hasSkillsIds = [],
                    baseSkillsIds = [],
                    awakeningSkillsIds = [],
                  } = card;

                  const skills = _.concat(
                    uniqueSkillsIds,
                    trainingSkillsIds,
                    hasSkillsIds,
                    baseSkillsIds,
                    awakeningSkillsIds
                  );

                  console.log(skills);
                  if (skills.includes(strID)) {
                    return relatedCards.push(card);
                  }
                });

                return cards.push(...relatedCards);
              }
            });

            return _.unionBy(cards, "id");
          })
          .catch((_err) => []);
      },
    },
  }),
});

module.exports = { SkillType, SkillInputType };
