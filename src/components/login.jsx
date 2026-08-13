import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  email: "",
  password: "",
  remember: false,
};

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  const validate = (values) => {
    const errors = {};
    if (!values.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Please enter your password";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formError) setFormError("");
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const showError = (field) => touched[field] && errors[field];

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) return;
    const email = form.email.trim();
    const { password } = form;
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (!registeredUser) {
      setFormError("No account found. Please sign up first.");
      return;
    }
    if (email !== registeredUser.email) {
      setFormError("This email is not registered. Please sign up first.");
      return;
    }
    if (password !== registeredUser.password) {
      setFormError("Incorrect password. Please try again.");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    navigate("/menu");
  };

  return (
    <div className="h-full bg-[#F5F1EA] m-16 py-4">
      <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        <div className="h-64 w-full md:h-auto md:w-1/2">
          <img
            src={login}
            alt="Delicious pizza"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full bg-[#FFFDF7] p-8 md:w-1/2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1F2937]">Login</h2>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Please login to your account.
            </p>
          </div>

          <form
            className="space-y-4 text-[#374151]"
            onSubmit={handleSubmit}
            noValidate
          >
            {formError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {formError}
              </div>
            )}

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
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("email"))}
                className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:ring-2 ${
                  showError("email")
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />
              {showError("email") && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

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
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("password"))}
                className={`w-full rounded-xl border bg-white px-4 py-2.5 outline-none transition focus:ring-2 ${
                  showError("password")
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />
              {showError("password") && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
              <button
                type="button"
                onClick={() =>
                  alert("Forgot password feature coming soon!")
                }
                className="mt-2 flex w-full justify-end text-sm font-semibold text-orange-500 hover:text-orange-600"
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4 accent-orange-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-orange-500 py-2.5 text-lg font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300"
            >
              Login →
            </button>

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