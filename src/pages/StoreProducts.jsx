import { FaBox, FaPlus, FaSearch } from "react-icons/fa";
import { useState } from "react";

const defaultProducts = [
  { id: 1, name: "Basmati Rice", category: "Grains", price: 120, stock: 45 },
  { id: 2, name: "Aashirvaad Atta", category: "Grains", price: 54, stock: 32 },
  { id: 3, name: "Toor Dal", category: "Pulses", price: 140, stock: 28 },
  { id: 4, name: "Fortune Oil", category: "Essentials", price: 145, stock: 18 },
  { id: 5, name: "Sugar", category: "Essentials", price: 48, stock: 50 },
  { id: 6, name: "Tea", category: "Beverages", price: 180, stock: 24 },
];

export default function StoreProducts() {
  const [products] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || defaultProducts;
  });

  return (
    <main className="p-5 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-green-600 font-semibold">
              Store Management
            </p>

            <h1 className="text-3xl font-bold text-slate-800 mt-1">Products</h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your grocery products and stock.
            </p>
          </div>

          <button
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl">
                  <FaBox />
                </div>

                <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mt-5">
                {product.name}
              </h2>

              <div className="flex justify-between items-end mt-5">
                <div>
                  <p className="text-xs text-slate-400">Price</p>

                  <p className="text-xl font-bold text-green-600">
                    ₹{product.price}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Stock</p>

                  <p className="font-semibold text-slate-700">
                    {product.stock} units
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
