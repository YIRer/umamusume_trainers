const hostname =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://umamusume-trainers.me";

const dbServer = `${hostname}/api`;
const graphqlServer = `${hostname}/graphql`;

module.exports = {
  dbServer,
  graphqlServer,
};
