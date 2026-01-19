import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_ENDPOINT = "https://graphql.kevinmlee.com/";

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
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
}

// Create a fresh client for each server request
const apolloClient = {
  query: async (options) => {
    const client = createApolloClient();
    return client.query(options);
  },
};

export default apolloClient;
