import login from "../assets/login.png";
import { useNavigate } from "react-router-dom";

function Sign() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const gender = form.gender.value;
    const terms = form.terms.checked;

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    // Name
    if (name === "") {
      alert("Please enter your name");
      return;
    }

    if (!nameRegex.test(name)) {
      alert("Name must contain only letters and spaces");
      return;
    }

    if (name.length < 2) {
      alert("Name must contain at least 2 characters");
      return;
    }

    // Email
    if (email === "") {
      alert("Please enter your email");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Phone
    if (phone === "") {
      alert("Please enter your phone number");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Phone number must contain exactly 10 digits");
      return;
    }

    // Password
    if (password === "") {
      alert("Please enter your password");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least one uppercase letter, one lowercase letter and one number"
      );
      return;
    }

    // Confirm Password
    if (confirmPassword === "") {
      alert("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Gender
    if (gender === "") {
      alert("Please select your gender");
      return;
    }

    // Terms
    if (!terms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    alert("Registration successful!");

    // After signup go to Login
    navigate("/login");
  };

  return (
    <div className=" bg-[#F5F1EA] p-8">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row">

        {/* Image */}
        <div className="h-64 w-full md:h-auto md:w-1/2">
          <img
            src={login}
            alt="Delicious pizza"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Sign Up Form */}
        <div className="w-full bg-[#FFFDF7] p-6 md:w-1/2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1F2937]">
              Sign Up
            </h2>
          </div>

          <form
            className="space-y-2 text-[#374151]"
            onSubmit={handleSubmit}
          >
            {/* Name */}
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Email */}
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Phone */}
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Password */}
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Confirm Password */}
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Gender */}
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
                defaultValue=""
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="" disabled>
                  Select gender
                </option>

                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-3 pt-2 pb-7">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="h-4 w-4 accent-orange-500"
              />

              <label
                htmlFor="terms"
                className="text-sm text-gray-600"
              >
                I agree to the{" "}
                <span className="font-semibold text-orange-500">
                  terms and conditions
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-orange-500 py-2 text-lg font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98]"
            >
              Sign Up →
            </button>

            {/* Login Navigation */}
            <p className="pt-3 text-center text-sm text-gray-600">
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