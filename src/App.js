import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddPlant from "./pages/AddPlant";
import PlantProfile from "./components/PlantProfile";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-plant" element={<AddPlant />} />
        <Route path="/:plantId" element={<PlantProfile />} />
      </Routes>
    </div>
  );
}

export default App;
