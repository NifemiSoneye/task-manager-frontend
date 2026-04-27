import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Landing from "./pages/landing/Landing";
import Board from "./pages/Board";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>
    </>
  );
}

export default App;
