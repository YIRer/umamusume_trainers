const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema.js");
const app = express();

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use("/api", jsonServer.router("./db/db.json"));
app.use("/graphql", expressGraphQL.graphqlHTTP({ graphiql: true, schema }));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(`${__dirname}/build/images`, { maxAge: 86400 }));
  app.use("/", express.static(`${__dirname}/build`));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
