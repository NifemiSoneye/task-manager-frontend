import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/ScrollToTop";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const Landing = lazy(() => import("./pages/landing/Landing"));
const Board = lazy(() => import("./pages/Board"));
const DashBoardLayout = lazy(() => import("./pages/DashBoardLayout"));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-[#0B1628] grid place-content-center">
            <LoaderCircle className="h-16 w-16 animate-spin text-white" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<DashBoardLayout />}>
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/board/:id" element={<Board />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
