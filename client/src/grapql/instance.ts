import { InMemoryCache, ApolloClient } from "@apollo/client";

export const instance = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
