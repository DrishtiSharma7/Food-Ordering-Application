import { useState } from "react";
import { Pizza, Plus, Minus, RotateCcw, ShoppingCart } from "lucide-react";

function Menu() {
  const [size, setSize] = useState("Medium");
  const [crust, setCrust] = useState("Classic");
  const [toppings, setToppings] = useState([]);
  const [sides, setSides] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const pizzaPrices = {
    Small: 149,
    Medium: 249,
    Large: 349,
  };

  const crustPrices = {
    Classic: 0,
    "Cheese Burst": 70,
    "Thin Crust": 40,
  };

  const toppingPrices = {
    "Extra Cheese": 50,
    Mushroom: 40,
    "Black Olives": 40,
    Capsicum: 30,
    Onion: 30,
    Jalapeno: 35,
  };

  const sidePrices = {
    "Garlic Bread": 99,
    "Cold Drink": 59,
    "Choco Lava Cake": 89,
    "Cheese Dip": 39,
  };

  const toggleTopping = (topping) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((item) => item !== topping)
        : [...prev, topping],
    );
  };

  const toggleSide = (side) => {
    setSides((prev) =>
      prev.includes(side)
        ? prev.filter((item) => item !== side)
        : [...prev, side],
    );
  };

  const toppingTotal = toppings.reduce(
    (total, topping) => total + toppingPrices[topping],
    0,
  );

  const sidesTotal = sides.reduce((total, side) => total + sidePrices[side], 0);

  const pricePerPizza = pizzaPrices[size] + crustPrices[crust] + toppingTotal;

  const subtotal = pricePerPizza * quantity + sidesTotal;

  const deliveryFee = subtotal >= 499 ? 0 : 40;

  const total = subtotal + deliveryFee;

  const handleQuantity = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const resetOrder = () => {
    setSize("Medium");
    setCrust("Classic");
    setToppings([]);
    setSides([]);
    setQuantity(1);
    setOrderPlaced(false);
  };

  const handleOrder = () => {
    const newOrder = {
      id: Date.now(),
      size,
      crust,
      toppings,
      sides,
      quantity,
      total,
      date: new Date().toISOString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("pizzaOrders")) || [];

    const updatedOrders = [newOrder, ...existingOrders];

    localStorage.setItem("pizzaOrders", JSON.stringify(updatedOrders));

    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F5F1EA] px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7.5xl">
        {/* Success Message */}
        {orderPlaced && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-center sm:mb-6">
            <h2 className="text-base font-bold text-green-700 sm:text-lg">
              Order Placed Successfully!
            </h2>

            <p className="mt-1 text-xs text-green-600 sm:text-sm">
              Your delicious pizza is being prepared.
            </p>
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          {/* LEFT SIDE */}
          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* Pizza Size */}
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:p-6">
              <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
                Choose Pizza Size
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {Object.entries(pizzaPrices).map(([item, price]) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`min-h-[80px] rounded-xl border-2 p-3 text-left transition sm:p-4 ${
                      size === item
                        ? "border-[#E85D04] bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{item}</p>

                    <p className="mt-1 text-sm text-gray-500">₹{price}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Crust */}
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:p-6">
              <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
                Choose Crust
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {Object.entries(crustPrices).map(([item, price]) => (
                  <label
                    key={item}
                    className={`flex min-h-[65px] cursor-pointer items-center justify-between gap-2 rounded-xl border-2 p-3 sm:p-4 ${
                      crust === item
                        ? "border-[#E85D04] bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <input
                        type="radio"
                        name="crust"
                        value={item}
                        checked={crust === item}
                        onChange={() => setCrust(item)}
                        className="h-4 w-4 shrink-0 accent-[#E85D04]"
                      />

                      <span className="text-sm font-medium text-gray-800 sm:text-base">
                        {item}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs text-gray-500 sm:text-sm">
                      {price === 0 ? "Free" : `+₹${price}`}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Toppings */}
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:p-6">
              <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
                Add Toppings
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.entries(toppingPrices).map(([item, price]) => (
                  <label
                    key={item}
                    className={`flex min-h-[65px] cursor-pointer items-center justify-between gap-2 rounded-xl border-2 p-3 sm:p-4 ${
                      toppings.includes(item)
                        ? "border-[#E85D04] bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <input
                        type="checkbox"
                        checked={toppings.includes(item)}
                        onChange={() => toggleTopping(item)}
                        className="h-4 w-4 shrink-0 accent-[#E85D04]"
                      />

                      <span className="text-sm font-medium text-gray-800 sm:text-base">
                        {item}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs text-gray-500 sm:text-sm">
                      +₹{price}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Sides */}
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:p-6">
              <h2 className="mb-4 text-lg font-bold text-[#1F2937] sm:text-xl">
                Choose Sides
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Object.entries(sidePrices).map(([item, price]) => (
                  <label
                    key={item}
                    className={`flex min-h-[65px] cursor-pointer items-center justify-between gap-2 rounded-xl border-2 p-3 sm:p-4 ${
                      sides.includes(item)
                        ? "border-[#E85D04] bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <input
                        type="checkbox"
                        checked={sides.includes(item)}
                        onChange={() => toggleSide(item)}
                        className="h-4 w-4 shrink-0 accent-[#E85D04]"
                      />

                      <span className="text-sm font-medium text-gray-800 sm:text-base">
                        {item}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs text-gray-500 sm:text-sm">
                      +₹{price}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Quantity */}
            <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#1F2937] sm:text-xl">
                    Quantity
                  </h2>

                  <p className="text-xs text-gray-500 sm:text-sm">
                    How many pizzas do you want?
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleQuantity("decrease")}
                    className="rounded-full bg-gray-100 p-2.5 transition hover:bg-gray-200 active:scale-95"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-8 text-center text-xl font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleQuantity("increase")}
                    className="rounded-full bg-gray-100 p-2.5 transition hover:bg-gray-200 active:scale-95"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE / ORDER SUMMARY */}
          <div className="min-w-0 lg:sticky lg:top-4 lg:h-fit">
            <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <ShoppingCart size={22} className="shrink-0 text-[#E85D04]" />

                <h2 className="text-lg font-bold text-[#1F2937] sm:text-xl">
                  Order Summary
                </h2>
              </div>

              {/* Pizza */}
              <div className="border-b pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800">{size} Pizza</p>

                    <p className="text-xs text-gray-500 sm:text-sm">
                      {crust} crust
                    </p>
                  </div>

                  <p className="shrink-0 font-semibold">
                    ₹{pizzaPrices[size] + crustPrices[crust]}
                  </p>
                </div>

                {toppings.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-600 sm:text-sm">
                      Toppings:
                    </p>

                    <p className="mt-1 break-words text-xs text-gray-500 sm:text-sm">
                      {toppings.join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="flex justify-between gap-3 border-b py-4">
                <span className="text-sm text-gray-600">
                  Pizza × {quantity}
                </span>

                <span className="shrink-0 text-sm font-medium">
                  ₹{pricePerPizza * quantity}
                </span>
              </div>

              {/* Sides */}
              <div className="border-b py-4">
                <div className="flex justify-between gap-3">
                  <span className="text-sm text-gray-600">Sides</span>

                  <span className="shrink-0 text-sm font-medium">
                    ₹{sidesTotal}
                  </span>
                </div>

                {sides.length > 0 && (
                  <p className="mt-1 break-words text-xs text-gray-500 sm:text-sm">
                    {sides.join(", ")}
                  </p>
                )}
              </div>

              {/* Delivery */}
              <div className="flex justify-between gap-3 border-b py-4">
                <span className="text-sm text-gray-600">Delivery</span>

                <span className="shrink-0 text-sm font-medium">
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>

              {/* Total */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-lg font-bold text-gray-800">Total</span>

                <span className="text-xl font-bold text-[#E85D04] sm:text-2xl">
                  ₹{total}
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleOrder}
                  className="w-full rounded-xl bg-[#E85D04] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d94f00] active:scale-[0.99] sm:text-base"
                >
                  Place Order
                </button>

                <button
                  type="button"
                  onClick={resetOrder}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.99] sm:text-base"
                >
                  <RotateCcw size={17} />
                  Reset Order
                </button>
              </div>

              {subtotal < 499 && (
                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                  Add ₹{499 - subtotal} more to get free delivery.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
