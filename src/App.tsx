import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Landing from "./pages/landing/Landing";
import Board from "./pages/Board";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import DashBoardLayout from "./pages/DashBoardLayout";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            {/* Protected */}
            <Route path="/" element={<DashBoardLayout />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/board/:id" element={<Board />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
