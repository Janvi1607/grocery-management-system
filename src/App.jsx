import {
  FaShoppingCart,
  FaBox,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaSearch,
  FaPlus,
  FaArrowRight,
  FaLeaf,
  FaUserCircle,
} from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Basmati Rice",
    category: "Grains",
    price: 120,
    unit: "1 kg",
    emoji: "🍚",
  },
  {
    id: 2,
    name: "Wheat Flour",
    category: "Grains",
    price: 55,
    unit: "1 kg",
    emoji: "🌾",
  },
  {
    id: 3,
    name: "Fresh Milk",
    category: "Dairy",
    price: 62,
    unit: "1 litre",
    emoji: "🥛",
  },
  {
    id: 4,
    name: "Cooking Oil",
    category: "Essentials",
    price: 145,
    unit: "1 litre",
    emoji: "🫗",
  },
  {
    id: 5,
    name: "Sugar",
    category: "Essentials",
    price: 48,
    unit: "1 kg",
    emoji: "🍬",
  },
  {
    id: 6,
    name: "Tea",
    category: "Beverages",
    price: 180,
    unit: "250 g",
    emoji: "🍵",
  },
  {
    id: 7,
    name: "Biscuits",
    category: "Snacks",
    price: 35,
    unit: "Pack",
    emoji: "🍪",
  },
  {
    id: 8,
    name: "Coffee",
    category: "Beverages",
    price: 220,
    unit: "200 g",
    emoji: "☕",
  },
];

const categories = [
  { name: "All", emoji: "🛒" },
  { name: "Grains", emoji: "🌾" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Essentials", emoji: "🧺" },
  { name: "Beverages", emoji: "☕" },
  { name: "Snacks", emoji: "🍪" },
];

const orders = [
  {
    id: "#ORD001",
    customer: "Rahul",
    amount: 850,
    status: "Completed",
  },
  {
    id: "#ORD002",
    customer: "Priya",
    amount: 1250,
    status: "Pending",
  },
  {
    id: "#ORD003",
    customer: "Aman",
    amount: 620,
    status: "Completed",
  },
  {
    id: "#ORD004",
    customer: "Sneha",
    amount: 980,
    status: "Pending",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-md">
                <FaShoppingCart />
              </div>

              <div>
                <h1 className="font-bold text-lg text-slate-800 leading-tight">
                  Grocery Management
                </h1>

                <p className="text-xs text-green-600 font-medium">
                  Fresh • Simple • Smart
                </p>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
              <a href="#home" className="text-green-600">
                Home
              </a>

              <a
                href="#products"
                className="hover:text-green-600 transition"
              >
                Products
              </a>

              <a
                href="#orders"
                className="hover:text-green-600 transition"
              >
                Orders
              </a>

              <a
                href="#stats"
                className="hover:text-green-600 transition"
              >
                Statistics
              </a>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-600 hover:text-green-600 transition">
                <FaShoppingCart className="text-lg" />

                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              <button className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm">
                <FaUserCircle />
                Login
              </button>
            </div>

          </div>
        </div>
      </nav>


      {/* ================= MAIN ================= */}
      <main id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* ================= HERO ================= */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl overflow-hidden shadow-lg mb-10">

          <div className="grid lg:grid-cols-2 items-center">

            {/* LEFT */}
            <div className="p-7 sm:p-10 lg:p-12 text-white">

              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full text-sm mb-5">
                <FaLeaf />
                Fresh groceries everyday
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Everything you need,
                <span className="block text-green-100">
                  all in one place.
                </span>
              </h2>

              <p className="mt-4 text-green-50 max-w-lg leading-relaxed">
                Manage your grocery shopping, explore daily essentials,
                track orders and enjoy a simple shopping experience.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                <button className="flex items-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-bold hover:bg-green-50 transition shadow-md">
                  Explore Products
                  <FaArrowRight />
                </button>

                <button className="px-5 py-3 rounded-xl font-semibold border border-white/40 hover:bg-white/10 transition">
                  View Orders
                </button>

              </div>
            </div>


            {/* RIGHT VISUAL */}
            <div className="hidden lg:flex items-center justify-center p-10">
              <div className="w-72 h-72 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-white/15 flex items-center justify-center">
                  <div className="text-8xl">
                    🛒
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ================= STATS ================= */}
        <section id="stats" className="mb-10">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                Store Overview
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Quick summary of your grocery management system
              </p>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* PRODUCTS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Products
                  </p>

                  <h4 className="text-3xl font-bold text-slate-800 mt-2">
                    120
                  </h4>

                  <p className="text-xs text-green-600 mt-2 font-medium">
                    +12 this month
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                  <FaBox />
                </div>

              </div>
            </div>


            {/* CUSTOMERS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-sm text-slate-500">
                    Customers
                  </p>

                  <h4 className="text-3xl font-bold text-slate-800 mt-2">
                    85
                  </h4>

                  <p className="text-xs text-blue-600 mt-2 font-medium">
                    +8% growth
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                  <FaUsers />
                </div>

              </div>
            </div>


            {/* ORDERS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    Orders
                  </p>

                  <h4 className="text-3xl font-bold text-slate-800 mt-2">
                    56
                  </h4>

                  <p className="text-xs text-orange-600 mt-2 font-medium">
                    8 pending
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                  <FaClipboardList />
                </div>

              </div>
            </div>


            {/* REVENUE */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">
                    Revenue
                  </p>

                  <h4 className="text-3xl font-bold text-slate-800 mt-2">
                    ₹24,500
                  </h4>

                  <p className="text-xs text-purple-600 mt-2 font-medium">
                    +15% this month
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                  <FaChartLine />
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* ================= CATEGORIES ================= */}
        <section className="mb-10">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                Shop by Category
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Browse everyday grocery essentials
              </p>
            </div>

          </div>


          <div className="flex gap-3 overflow-x-auto pb-2">

            {categories.map((category, index) => (

              <button
                key={category.name}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border font-medium transition ${
                  index === 0
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-green-500 hover:text-green-600"
                }`}
              >
                <span>{category.emoji}</span>
                {category.name}
              </button>

            ))}

          </div>

        </section>


        {/* ================= PRODUCTS ================= */}
        <section id="products" className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">
                Popular Products
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Fresh essentials available in your grocery store
              </p>
            </div>


            {/* SEARCH */}
            <div className="relative w-full sm:w-72">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>


          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {products.map((product) => (

              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* PRODUCT IMAGE AREA */}
                <div className="h-44 bg-green-50 flex items-center justify-center relative">

                  <div className="text-7xl group-hover:scale-110 transition duration-300">
                    {product.emoji}
                  </div>

                  <span className="absolute top-3 left-3 bg-white/90 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                </div>


                {/* PRODUCT DETAILS */}
                <div className="p-5">

                  <h4 className="font-bold text-lg text-slate-800">
                    {product.name}
                  </h4>

                  <p className="text-sm text-slate-500 mt-1">
                    {product.unit}
                  </p>


                  <div className="flex items-center justify-between mt-5">

                    <div>
                      <p className="text-xs text-slate-400">
                        Price
                      </p>

                      <p className="text-xl font-bold text-green-600">
                        ₹{product.price}
                      </p>
                    </div>


                    <button className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition shadow-sm">
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>

            ))}

          </div>
        </section>


        {/* ================= ORDERS + QUICK INFO ================= */}
        <section
          id="orders"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
        >

          {/* ORDERS TABLE */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            <div className="p-5 border-b border-slate-100 flex items-center justify-between">

              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Recent Orders
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Latest grocery orders
                </p>
              </div>

              <button className="text-sm font-semibold text-green-600 hover:text-green-700">
                View All
              </button>

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


          {/* QUICK ACTION CARD */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">

            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-5">
              <FaShoppingCart />
            </div>

            <h3 className="text-2xl font-bold">
              Ready to shop?
            </h3>

            <p className="text-slate-300 mt-3 leading-relaxed">
              Explore our grocery collection and add your daily essentials
              to the shopping cart.
            </p>

            <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition">
              Start Shopping
            </button>

          </div>

        </section>


        {/* ================= FOOTER ================= */}
        <footer className="border-t border-slate-200 pt-6 pb-4 text-center">

          <p className="text-sm text-slate-500">
            © 2026 Grocery Management System
          </p>

          <p className="text-xs text-slate-400 mt-1">
            A smart solution for modern grocery management
          </p>

        </footer>

      </main>
    </div>
  );
}

export default App;