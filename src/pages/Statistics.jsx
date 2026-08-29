import {
  FaChartLine,
  FaBox,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useApp } from "../context/AppContext";

export default function Statistics() {
  const { orders, products } = useApp();

  /* ================= ORDER COUNTS ================= */

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  /* ================= REVENUE ================= */

  const totalRevenue = orders
    .filter((order) => order.status === "Completed")
    .reduce((total, order) => total + Number(order.amount || 0), 0);

  /* ================= CUSTOMERS ================= */

  const uniqueCustomers = new Set(
    orders.map((order) => order.customer)
  );

  const totalCustomers = uniqueCustomers.size;

  /* ================= MONTHLY DATA ================= */

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = monthNames.map((month) => ({
    month,
    revenue: 0,
    orders: 0,
  }));

 orders.forEach((order) => {
  if (!order.date) return;

  const orderDate = new Date(order.date);

  if (isNaN(orderDate.getTime())) return;

  const monthIndex = orderDate.getMonth();

  monthlyData[monthIndex].orders += 1;

  if (order.status === "Completed") {
    monthlyData[monthIndex].revenue += Number(order.amount || 0);
  }
});

  /* ================= ORDER STATUS ================= */

  const orderStatusData = [
    {
      name: "Completed",
      value: completedOrders,
    },
    {
      name: "Pending",
      value: pendingOrders,
    },
  ];

  return (
    <main className="p-5 sm:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <p className="text-sm text-green-600 font-semibold">
            Store Analytics
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            Statistics
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Overview of your grocery store performance.
          </p>

        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

            <FaChartLine className="text-green-600 text-2xl" />

            <p className="text-sm text-slate-500 mt-4">
              Revenue
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-1">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h2>

            <p className="text-xs text-green-600 mt-2">
              From completed orders
            </p>

          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

            <FaClipboardList className="text-orange-500 text-2xl" />

            <p className="text-sm text-slate-500 mt-4">
              Orders
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-1">
              {totalOrders}
            </h2>

            <p className="text-xs text-orange-600 mt-2">
              {pendingOrders} pending
            </p>

          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

            <FaBox className="text-blue-600 text-2xl" />

            <p className="text-sm text-slate-500 mt-4">
              Products
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-1">
              {products.length}
            </h2>

            <p className="text-xs text-blue-600 mt-2">
              Available products
            </p>

          </div>


          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

            <FaUsers className="text-purple-600 text-2xl" />

            <p className="text-sm text-slate-500 mt-4">
              Customers
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-1">
              {totalCustomers}
            </h2>

            <p className="text-xs text-purple-600 mt-2">
              Customers with orders
            </p>

          </div>

        </div>


        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          {/* REVENUE CHART */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

            <div className="mb-5">

              <h2 className="text-xl font-bold text-slate-800">
                Revenue Overview
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Monthly revenue performance
              </p>

            </div>

            <div className="h-72">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={monthlyData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />

                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => `₹${value}`}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `₹${Number(value).toLocaleString("en-IN")}`,
                      "Revenue",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* ORDER STATUS DONUT */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

            <div className="mb-3">

              <h2 className="text-xl font-bold text-slate-800">
                Order Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Current order distribution
              </p>

            </div>

            <div className="h-72">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="45%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >

                    <Cell fill="#16a34a" />
                    <Cell fill="#f97316" />

                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [
                      `${value} orders`,
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>


        {/* MONTHLY ORDERS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-slate-800">
              Monthly Orders
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Number of orders received each month
            </p>

          </div>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip
                  formatter={(value) => [`${value} orders`, "Orders"]}
                  labelFormatter={(label) => `Month: ${label}`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </main>
  );
}