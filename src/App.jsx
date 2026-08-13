import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sign from "./components/sign";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Menu from "./components/menu";
import Orders from "./components/orders";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F1EA]">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />

          <Route
            path="/sign"
            element={
              <>
                <Navbar />
                <Sign />
              </>
            }
          />

          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Navbar />
                <Menu />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Navbar />
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
