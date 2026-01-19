import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";

const GRAPHQL_ENDPOINT = "https://graphql.kevinmlee.com/";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: "include",
      fetch,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },
  });
});

const apolloClient = {
  query: async (options) => {
    const client = getClient();
    return client.query(options);
  },
};

export default apolloClient;
