import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Entry from "./pages/Entry";

// hooks
import { useOwnerName } from "./utilities/hooks";

function App() {
  // const [title, setTitle] = useState(null);

  const location = useLocation();

  const ownerId = Cookies.get("owner");

  // console.log(location.pathname);

  return (
    <>
      {ownerId ? (
        <>
          <CssBaseline />
          <Header />
          <NavBar />
          <Outlet />
        </>
      ) : (
        <>
          <CssBaseline />
          <Entry />
        </>
      )}
    </>
  );
}

export default App;
