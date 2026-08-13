import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Phone } from "lucide-react";
import login from "../assets/login.png";

const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: "",
  terms: false,
};

function Sign() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = "Please enter your name";
    } else if (!NAME_REGEX.test(values.name.trim())) {
      errors.name = "Name must contain only letters and spaces";
    } else if (values.name.trim().length < 2) {
      errors.name = "Name must contain at least 2 characters";
    }

    if (!values.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.phone.trim()) {
      errors.phone = "Please enter your phone number";
    } else if (!PHONE_REGEX.test(values.phone.trim())) {
      errors.phone = "Phone number must contain exactly 10 digits";
    }

    if (!values.password) {
      errors.password = "Please enter your password";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!PASSWORD_REGEX.test(values.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter and one number";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!values.gender) {
      errors.gender = "Please select your gender";
    }

    if (!values.terms) {
      errors.terms = "Please agree to the terms and conditions";
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
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const showError = (field) => touched[field] && errors[field];

  const handleSubmit = (event) => {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      gender: true,
      terms: true,
    });

    if (!isValid) return;

    const email = form.email.trim();

    const existingUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (existingUser && existingUser.email === email) {
      setTouched((prev) => ({ ...prev, email: true }));
      alert("An account with this email already exists. Please login.");
      navigate("/login");
      return;
    }

    const user = {
      name: form.name.trim(),
      email,
      phone: form.phone.trim(),
      password: form.password,
      gender: form.gender,
    };

    localStorage.setItem("registeredUser", JSON.stringify(user));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#F5F1EA] p-4">
        <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl bg-white p-10 text-center shadow-2xl">
          <CheckCircle2 size={56} className="text-green-500" />

          <h2 className="mt-4 text-xl font-bold text-[#1F2937]">
            Registration successful!
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your account has been created. You can now login to start ordering.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 w-full rounded-xl bg-orange-500 py-2.5 text-lg font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98]"
          >
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EA] p-8">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">
        <div className="h-64 w-full md:h-auto md:w-1/2">
          <img
            src={login}
            alt="Delicious pizza"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full bg-[#FFFDF7] p-6 md:w-1/2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1F2937]">Sign Up</h2>
          </div>

          <form
            className="space-y-2 text-[#374151]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("name"))}
                className={`w-full rounded-xl border bg-white px-4 py-2 outline-none transition focus:ring-2 ${
                  showError("name")
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />

              {showError("name") && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-semibold"
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
                className={`w-full rounded-xl border bg-white px-4 py-2 outline-none transition focus:ring-2 ${
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
                htmlFor="phone"
                className="mb-1 block text-sm font-semibold"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                maxLength="10"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("phone"))}
                className={`w-full rounded-xl border bg-white px-4 py-2 outline-none transition focus:ring-2 ${
                  showError("phone")
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />

              {showError("phone") && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-semibold"
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
                className={`w-full rounded-xl border bg-white px-4 py-2 outline-none transition focus:ring-2 ${
                  showError("password")
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />

              {showError("password") && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-semibold"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("confirmPassword"))}
                className={`w-full rounded-xl border bg-white px-4 py-2 outline-none transition focus:ring-2 ${
                  showError("confirmPassword")
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />

              {showError("confirmPassword") && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="gender"
                className="mb-1 block text-sm font-semibold"
              >
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("gender"))}
                className={`w-full rounded-xl border bg-white px-4 py-2 outline-none transition focus:ring-2 ${
                  showError("gender")
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                }`}
              >
                <option value="" disabled>
                  Select gender
                </option>

                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              {showError("gender") && (
                <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
              )}
            </div>

            <div className="pt-2 pb-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-4 w-4 accent-orange-500"
                />

                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="font-semibold text-orange-500">
                    terms and conditions
                  </span>
                </label>
              </div>

              {showError("terms") && (
                <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="mt-3 w-full rounded-xl bg-orange-500 py-2 text-lg font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300"
            >
              Sign Up →
            </button>

            <p className="pt-3 pb-5 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign;
