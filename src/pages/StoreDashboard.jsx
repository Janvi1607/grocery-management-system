import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaChartLine, FaUsers, FaBox } from "react-icons/fa";
import StatCard from "../components/StatCard";

export default function StoreDashboard() {
  const { orders, products } = useApp();

   const navigate = useNavigate();

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status === "Completed")
    .reduce((sum, order) => sum + order.amount, 0);

  return (
    <main className="flex-1 p-5 sm:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-green-600 font-semibold">
            Store Dashboard
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            Welcome, Store Admin
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your grocery store from one place.
          </p>
        </div>

        <div className="bg-white border border-green-100 rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-xs text-slate-400">Today's Status</p>

          <p className="font-bold text-green-600">Store is Active</p>
        </div>
      </div>

      {/* STAT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Products"
          value={products.length}
          description="Products available"
          icon={<FaBox />}
          iconStyle="bg-green-100 text-green-600"
        />

        <StatCard
          title="Customers"
          value={[...new Set(orders.map((order) => order.customer))].length}
          description="+8% growth"
          icon={<FaUsers />}
          iconStyle="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Orders"
          value={totalOrders}
          description={`${pendingOrders} pending`}
          icon={<FaClipboardList />}
          iconStyle="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          description={`${completedOrders} completed`}
          icon={<FaChartLine />}
          iconStyle="bg-purple-100 text-purple-600"
        />
      </section>

      {/* CONTENT GRID */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ORDERS */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>

            <p className="text-sm text-slate-500 mt-1">
              Monitor the latest customer orders
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-xs uppercase tracking-wide text-slate-500">
                    Order
                  </th>

                  <th className="px-5 py-3 text-xs uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs uppercase tracking-wide text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-xs uppercase tracking-wide text-slate-500">
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

                    <td className="px-5 py-4 font-semibold text-slate-700">
                      ₹{order.amount}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <FaClipboardList />
            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              Pending Orders
            </h3>

            <p className="text-green-500 mt-2">
              You currently have {pendingOrders} orders waiting for processing.
            </p>

            <button 
              onClick={() => navigate("/store/orders")}
              className="mt-5 w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition"
            >
              View Orders
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800">
              Store Information
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Store Status</span>

                <span className="text-green-600 font-semibold">Active</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Products</span>

                <span className="font-semibold text-slate-700">{products.length}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Customers</span>

                <span className="font-semibold text-slate-700">{[...new Set(orders.map((order) => order.customer))].length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 mt-10 pt-6 text-center">
        <p className="text-sm text-slate-500">
          © 2026 Grocery Management System
        </p>
      </footer>
    </main>
  );
}
