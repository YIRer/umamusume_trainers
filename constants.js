const hostname =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://umamusume-trainers.me";

const dbServer = `${hostname}/api`;
const graphqlServer = `${hostname}/graphql`;
const imageRegex = /image/i;

module.exports = {
  dbServer,
  graphqlServer,
  imageRegex,
};
