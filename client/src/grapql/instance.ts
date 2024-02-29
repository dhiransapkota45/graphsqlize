/* eslint-disable @typescript-eslint/no-explicit-any */
import { onError } from '@apollo/client/link/error';
import { InMemoryCache, ApolloClient, createHttpLink, ApolloLink, Observable } from "@apollo/client";
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

const refreshToken = async () => {
  console.log("called")
  const response = await fetch("http://localhost:4000/refresh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refresh_token") ?? ""
      })
    })
  if (response.ok) {
    console.log("im here")
    const data = await response.json()
    return data

  } else {
    localStorage.clear()
    location.href = "/login"
  }
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  // User access token has expired
  if (graphQLErrors && graphQLErrors[0]?.extensions?.statusCode === 403) {
    // We assume we have both tokens needed to run the async request
    if (localStorage.getItem("refresh_token") ?? false) {
      // Let's refresh token through async request
      return new Observable(observer => {
        refreshToken()
          .then(refreshResponse => {
            operation.setContext(({ headers = {} }) => ({
              headers: {
                // Re-add old headers
                ...headers,
                // Switch out old access token for new one
                token: refreshResponse?.token ?? null,
              }
            }));
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            };

            // Retry last failed request
            forward(operation).subscribe(subscriber);
          })
          .catch(error => {
            // No refresh or client token available, we force user to login
            observer.error(error);
          });
      });
    }
  }
})

// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     if (graphQLErrors) {
//       // for (const err of graphQLErrors) {
//       // switch (err.extensions.statusCode) {
//       // case 403:
//       if (graphQLErrors[0]?.extensions?.statusCode) {
//         return new Observable((observer) => {
//           refreshToken().then((res) => {
//             operation.setContext(({ headers = {} }) => ({
//               headers: {
//                 ...headers,
//                 token: res?.token ?? ""
//               }
//             }))
//           }).then(() => {
//             const subscriber = {
//               next: observer.next.bind(observer),
//               error: observer.error.bind(observer),
//               complete: observer.complete.bind(observer)
//             }
//             forward(operation).subscribe(subscriber)
//           }).catch(error => {
//             observer.error(error)
//           })
//         })
//       }
//       // }
//       // }
//     }
//     if (networkError) {
//       console.log(`[Network error]: ${networkError}`)
//     }
//   }
// )


// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     if (graphQLErrors) {
//       if (graphQLErrors[0].extensions.statusCode === 403) {
//         //hit refresh token using instance of apollo client
//         console.log("403 error")
//         return fromPromise(refreshToken().then((res) => {
//           if (res?.token) {
//             const oldHeaders = operation.getContext().headers;
//             operation.setContext({
//               headers: {
//                 ...oldHeaders,
//                 token: res?.token
//               },
//             });

//             return forward(operation)
//           }
//         }))
//       }
//     }
//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   }
// );


export const instance = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
