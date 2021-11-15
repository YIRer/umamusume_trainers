import { InMemoryCache, ApolloClient } from "@apollo/client";
import { withApollo } from "next-with-apollo";

const { graphqlServer } = require("../constants.js");

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }).restore(initialState || {}),

    uri: graphqlServer,
  });
});
