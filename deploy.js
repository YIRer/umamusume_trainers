const express = require("express");
const next = require("next");
const jsonServer = require("json-server");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema.js");

const isDev = process.env.NODE_ENV === "development";

const app = next({ dev: isDev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const port = process.env.PORT || 8080;

  server.use("/sitemap.xml", function (_req, res) {
    res.sendFile(__dirname + "/public/sitemap.xml");
  });

  server.use("/add.txt", function (_req, res) {
    res.sendFile(__dirname + "/public/add.txt");
  });

  server.use("/api", jsonServer.router("./db/db.json"));
  server.use(
    "/graphql",
    expressGraphQL.graphqlHTTP({ graphiql: isDev, schema })
  );

  if (!isDev) {
    server.get("/admin/**", (_req, res) => {
      return res.redirect("/");
    });
  }

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
