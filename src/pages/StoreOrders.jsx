import { FaClipboardList } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";
import socket from "../socket";

// const defaultOrders = [
//   { id: "#ORD001", customer: "Rahul", amount: 850, status: "Completed" },
//   { id: "#ORD002", customer: "Priya", amount: 1250, status: "Pending" },
//   { id: "#ORD003", customer: "Aman", amount: 620, status: "Completed" },
//   { id: "#ORD004", customer: "Sneha", amount: 980, status: "Pending" },
//   { id: "#ORD005", customer: "Riya", amount: 1450, status: "Completed" },
// ];

export default function StoreOrders() {
  const { orders, updateOrderStatus, addOrder } = useApp();

  // const [orders] = useState(() => {
  //   return JSON.parse(localStorage.getItem("orders")) || defaultOrders;
  // });

  useEffect(() => {
    const handleConnect = () => {
      socket.emit("join-store");
    };

    const handleNewOrder = (newOrder) => {
      addOrder(newOrder);

      alert(`New order received from ${newOrder.customer}`);
    };

    socket.on("connect", handleConnect);
    socket.on("new-order", handleNewOrder);

    // If socket is already connected, join immediately
    if (socket.connected) {
      socket.emit("join-store");
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("new-order", handleNewOrder);
    };
  }, [addOrder]);

  return (
    <main className="p-5 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm text-green-600 font-semibold">
            Store Management
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-1">Orders</h1>

          <p className="text-sm text-slate-500 mt-1">
            Monitor and manage customer orders.
          </p>
        </div>

        {/* ORDER SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Total Orders</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
            <p className="text-sm text-orange-600">Pending</p>
            <p className="text-3xl font-bold text-orange-700 mt-2">
              {orders.filter((order) => order.status === "Pending").length}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
            <p className="text-sm text-green-600">Completed</p>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {orders.filter((order) => order.status === "Completed").length}
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <FaClipboardList />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Recent Orders</h2>

              <p className="text-sm text-slate-500">Latest customer orders</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs uppercase text-slate-500">
                    Order ID
                  </th>

                  <th className="px-5 py-4 text-xs uppercase text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-xs uppercase text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-xs uppercase text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {order.id}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {order.customer}
                    </td>

                    <td className="px-5 py-4 font-semibold">₹{order.amount}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {order.status}
                        </span>

                        {order.status === "Pending" && (
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "Completed")
                            }
                            className="text-xs font-semibold text-green-600 hover:text-green-700"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
