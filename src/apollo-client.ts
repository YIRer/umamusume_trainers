import { InMemoryCache, ApolloClient } from "@apollo/client";
import { withApollo } from "next-with-apollo";

const { graphqlServer } = require("../constants.js");

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies: {
        Query: {
          fields: {
            cards: {
              merge(_existing, incoming) {
                return incoming;
              },
            },
            umamusumeList: {
              merge(_existing, incoming) {
                return incoming;
              },
            },
            skills: {
              merge(_existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }).restore(initialState || {}),

    uri: graphqlServer,
  });
});
