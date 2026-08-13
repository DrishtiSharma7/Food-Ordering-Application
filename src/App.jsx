import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sign from "./components/sign";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Menu from "./components/menu";
import Orders from "./components/orders";

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
              <>
                <Navbar />
                <Menu />
              </>
            }
          />

          <Route
            path="/orders"
            element={
              <>
                <Navbar />
                <Orders />
              </>
            }
          />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;