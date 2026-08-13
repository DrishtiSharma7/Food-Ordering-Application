import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Pizza, User, Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/sign";

  return (
    <nav className="w-full bg-[#F5F1EA] shadow-sm">
      <div
        className={`mx-auto flex max-w-8xl items-center px-4 py-3 ${
          isAuthPage ? "justify-start" : "justify-between"
        }`}
      >
        <h1
          onClick={() => !isAuthPage && handleNavigate("/")}
          className={`flex items-center text-lg font-bold text-[#1F2937] sm:text-xl md:text-2xl ${
            !isAuthPage ? "cursor-pointer" : ""
          }`}
        >
          <Pizza size={30} className="mr-2 shrink-0 text-orange-600 sm:mr-3" />

          <span>Mario's Pizza</span>
        </h1>

        {!isAuthPage && (
          <>
            <div className="hidden items-center gap-2 md:flex lg:gap-4">
              <button
                onClick={() => navigate("/menu")}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition hover:text-orange-600 lg:px-4 lg:text-md"
              >
                Menu
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 transition hover:text-orange-600 lg:px-4 lg:text-md"
              >
                Orders
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="rounded-full p-2 text-orange-500 transition hover:bg-orange-100 hover:text-gray-800"
              >
                LogOut
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md p-2 text-gray-800 transition hover:bg-orange-100 md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </>
        )}
      </div>

      {!isAuthPage && isOpen && (
        <div className="mt-3 border-t border-orange-100 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNavigate("/menu")}
              className="rounded-lg px-4 py-3 text-left font-medium text-gray-800 transition hover:bg-orange-100 hover:text-orange-600"
            >
              Menu
            </button>

            <button
              onClick={() => handleNavigate("/orders")}
              className="rounded-lg px-4 py-3 text-left font-medium text-gray-800 transition hover:bg-orange-100 hover:text-orange-600"
            >
              Orders
            </button>

            <button
              onClick={() => handleNavigate("/login")}
              className="rounded-lg px-4 py-3 text-left font-medium text-gray-800 transition hover:bg-orange-100 hover:text-orange-600"
            >
              LogOut
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
