const cards = require("./cards.json");
const conditions = require("./conditions.json");
const skills = require("./skills.json");
const umamusume = require("./umamusume.json");

module.exports = () => ({
  cards: cards.cards,
  conditions: conditions.conditions,
  skills: skills.skills,
  umamusume: umamusume.umamusume
})
