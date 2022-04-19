const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema.js");

const server = express();
const port = process.env.PORT || 8080;

server.use(cors());
server.use("/api", jsonServer.router("./db/db.json"));
server.use("/graphql", expressGraphQL.graphqlHTTP({ graphiql: true, schema }));

server.listen(port, () => console.log(`Listening on port ${port}`));
