import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_ENDPOINT = "https://graphql.kevinmlee.com/";

// Create a new Apollo Client instance for server-side use
// For Next.js App Router, we create a new client per request to avoid caching issues
export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      fetch,
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache", // Always fetch fresh data
        errorPolicy: "all",
      },
    },
  });
}

// For server components, create a singleton-like pattern
let apolloClient = null;

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
}
