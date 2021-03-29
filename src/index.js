import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import App from "./App";

const { graphqlServer } = require("../constants.js");

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: graphqlServer,
  ssrMode: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
