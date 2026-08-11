import login from "../assets/login.png";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      event.target.name.value === "" ||
      event.target.email.value === "" ||
      event.target.phone.value === "" ||
      event.target.password.value === ""
    ) {
      alert("Please fill all the fields");
    }
  }

  return (
    <div className=" bg-[#F5F1EA] pt-8 ">
      {/* Main Card */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white shadow-2xl ">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={login}
            alt="Delicious pizza"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 bg-[#FFFDF7]">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1F2937]">Sign Up</h2>
          </div>

          <form className="space-y-2 text-[#374151] ">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-1.5 text-sm font-semibold"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl
                outline-none transition
                focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-semibold"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl
                outline-none transition
                focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-semibold"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl
                outline-none transition
                focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-semibold"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl
                outline-none transition
                focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm font-semibold"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl
                outline-none transition
                focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block mb-1 text-sm font-semibold"
              >
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl
                outline-none transition
                focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
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
                className="w-4 h-4 accent-orange-500"
              />

              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="font-semibold text-orange-500">
                  terms and conditions
                </span>
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-3 py-2
              bg-orange-500 text-white
              font-semibold text-lg
              rounded-xl
              shadow-md shadow-orange-200
              transition-all duration-200
              hover:bg-orange-600
              hover:shadow-lg hover:shadow-orange-200
              active:scale-[0.98]"
              onClick={handleSubmit}
            >
              Login →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
