import { useEffect, useState } from "react";
import { Pizza, Trash2 } from "lucide-react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("pizzaOrders")) || [];
    setOrders(savedOrders);
  }, []);

  const clearOrders = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all orders?",
    );
    if (!confirmClear) return;
    localStorage.removeItem("pizzaOrders");
    setOrders([]);
    alert("All orders have been deleted successfully.");
  };

  const deleteOrder = (id) => {
    const order = orders.find((order) => order.id === id);
    if (!order) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Order with ID: ${id}?`,
    );
    if (!confirmDelete) return;
    const updatedOrders = orders.filter((order) => order.id !== id);
    localStorage.setItem("pizzaOrders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    alert(`Order has been deleted successfully.`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F5F1EA] px-4 py-2 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7.5xl">
        <div className="flex items-center justify-between pb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-800 sm:text-xl">
              Previous Orders
            </h1>
          </div>
          {orders.length > 0 && (
            <button
              onClick={clearOrders}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Clear All Orders</span>
              <span className="sm:hidden">Clear</span>
            </button>
          )}
        </div>
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <Pizza size={32} className="text-orange-600" />
            </div>

            <h2 className="text-xl font-bold text-gray-800">No Orders Yet</h2>

            <p className="mt-2 text-sm text-gray-500">
              Your previous orders will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="flex h-full flex-col rounded-2xl bg-white p-3 shadow-sm sm:p-4"
              >
                <div className="flex items-center justify-between gap-3 border-b p-2 pb-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-orange-600">
                      Order #{orders.length - index}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                      Completed
                    </span>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                      title="Delete order"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="grid flex-1 gap-4 py-3 md:grid-cols-2">
                  <div className="rounded-xl bg-[#F5F1EA] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex shrink-0 items-center justify-center rounded-full bg-white p-3">
                        <Pizza size={24} className="text-orange-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-800">
                          {order.size} Pizza
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {order.crust} crust
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          Quantity: {order.quantity}
                        </p>
                      </div>
                    </div>
                    {order.toppings?.length > 0 && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <p className="text-xs font-semibold text-gray-600">
                          Toppings
                        </p>
                        <p className="mt-1 break-words text-sm leading-5 text-gray-500">
                          {order.toppings.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-gray-100 p-4">
                    <h3 className="font-semibold text-gray-800">Sides</h3>
                    {order.sides?.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {order.sides.map((side) => (
                          <li
                            key={side}
                            className="flex items-center justify-between gap-2 text-sm"
                          >
                            <span className="break-words text-gray-600">
                              {side}
                            </span>
                            <span className="shrink-0 text-green-600">✓</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-gray-400">
                        No sides selected
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <span className="font-semibold text-gray-700">
                    Total Amount
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
