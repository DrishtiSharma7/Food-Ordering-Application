import login from "../assets/login.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (email === "") {
      alert("Please enter your email");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password validation
    if (password === "") {
      alert("Please enter your password");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    alert("Login successful!");

    // Go to Home
    navigate("/menu");
  };

  return (
    <div className="h-full bg-[#F5F1EA] m-16 py-4">
      <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">

        {/* Image */}
        <div className="h-64 w-full md:h-auto md:w-1/2">
          <img
            src={login}
            alt="Delicious pizza"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form */}
        <div className="w-full bg-[#FFFDF7] p-8 md:w-1/2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1F2937]">
              Login
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Please login to your account.
            </p>
          </div>

          <form
            className="space-y-4 text-[#374151]"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() => alert("Forgot password feature coming soon!")}
                className="mt-2 flex w-full justify-end text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                Forgot Password?
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 accent-orange-500"
              />

              <label
                htmlFor="remember"
                className="text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="flex items- justify-center mt-4 w-full rounded-xl bg-orange-500 py-2.5 text-lg font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98]"
            >
              Login →
            </button>

            {/* Sign Up Navigation */}
            <p className="pt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/sign")}
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;