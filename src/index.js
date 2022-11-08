import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/authContext";

// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
// });

// const authLink = setContext((request, {header}) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem("token") || ""}}
// });

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById("root")
);
