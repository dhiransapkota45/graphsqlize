import { InMemoryCache, ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const backenduri = "http://localhost:4000/graphql"

const httpLink = createHttpLink({ uri: backenduri });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? `${token}` : "",
    }
  }
});

export const instance = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
