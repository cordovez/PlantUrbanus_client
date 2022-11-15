import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// const authLink = setContext((request, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem("token") || "",
//     },
//   };
// });

export default client;
