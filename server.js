const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema.js");

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.use("/api", jsonServer.router("./db/db.json"));
app.use("/graphql", expressGraphQL.graphqlHTTP({ graphiql: true, schema }));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(`${__dirname}/build`));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} 

// else if (process.env.NODE_ENV === "development") {
//   const webpackMiddleware = require("webpack-dev-middleware");
//   const webpackHotMiddleware = require("webpack-hot-middleware");
//   const webpack = require("webpack");

//   const webpackConfig = require("./webpack.config.js");
//   const compiler = webpack(webpackConfig());

//   app.use(webpackMiddleware(compiler));
//   app.use(webpackHotMiddleware(compiler));

//   app.use("/", express.static(`${__dirname}/public`));
// }

app.listen(port, () => console.log(`Listening on port ${port}`));
