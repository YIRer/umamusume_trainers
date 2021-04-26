const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema.js");
const app = express();

const port = process.env.PORT || 8080;

app.use("/api", jsonServer.router("./db/db.json"));
app.use("/graphql", expressGraphQL.graphqlHTTP({ graphiql: false, schema }));

app.use("/", express.static(`${__dirname}/build/images`, { maxAge: 86400 }));
app.use("/", express.static(`${__dirname}/build`));
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
