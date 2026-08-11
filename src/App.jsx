import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Pizza } from "lucide-react";

import Sign from "./components/sign";
import LoginForm from "./components/login";
import Navbar from "./components/navbar";

function SignIn() {
  return (
    <div className=" bg-[#F5F1EA] p-6 ">
      <h1 className="flex items-center text-3xl md:text-2xl font-bold text-[#1F2937]">
        <Pizza className="mr-4" />
        Food Ordering Application
      </h1>

      <Sign />
    </div>
  );
}

function LoginPage() {
  return (
    <div className=" bg-[#F5F1EA] p-6">
      <h1 className="flex items-center text-3xl md:text-2xl font-bold text-[#1F2937]">
        <Pizza className="mr-4" />
        Food Ordering Application
      </h1>

      <LoginForm />
    </div>
  );
}

function Home() {
  return (
    <div className=" bg-[#F5F1EA]">
      <Navbar />

      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1F2937]">
            Welcome to Food Ordering Application 🍕
          </h1>

          <p className="mt-3 text-gray-600">
            Order your favorite food easily.
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Sign Up */}
        <Route path="/sign" element={<SignIn />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;