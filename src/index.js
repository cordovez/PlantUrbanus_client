import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/authContext";

// Pages
import Login from "./pages/Entry";
import AddPlant from "./pages/AddPlant";
import PlantProfile from "./pages/PlantProfile";
import OwnerPlants from "./pages/OwnerPlants";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// MUI
import { ThemeProvider } from "@mui/material/styles";
import { PlantUrbanusTheme } from "./PlantUrbanusTheme";

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <ThemeProvider theme={PlantUrbanusTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="add-plant" element={<AddPlant />} />
              <Route path="plants" element={<OwnerPlants />} />
              <Route path=":plantId" element={<PlantProfile />} />
              <Route path="not-found" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById("root")
);
