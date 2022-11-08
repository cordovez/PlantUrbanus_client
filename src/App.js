import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
