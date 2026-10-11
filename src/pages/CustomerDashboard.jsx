import { FaSearch, FaArrowRight, FaLeaf, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

/*** Products Images */
import basmati_rice from "../assets/products/basmati_rice.jpg";
import brown_rice from "../assets/products/brown_rice.jpg";
import atta from "../assets/products/aashirvaad_atta.jpg";
import wheat_flour from "../assets/products/fortune_atta.jpg";
import chana_dal from "../assets/products/chana_dal.jpg";
import toor_dal from "../assets/products/toor_dal.jpg";
import masoor_dal from "../assets/products/masoor_dal.jpg";
import moong_dal from "../assets/products/moong_dal.jpg";
import green_moong from "../assets/products/green_moong.jpg";
import chole from "../assets/products/chole.jpg";
import rajma from "../assets/products/rajma.jpg";
import soyabean_chunks from "../assets/products/soyachunks.jpg";
import salt from "../assets/products/salt.jpg";
import sugar from "../assets/products/sugar.jpg";
import maggi from "../assets/products/maggi.jpg";
import oreo from "../assets/products/oreo.jpg";
import good_day from "../assets/products/good_day.jpg";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
const productImages = {
  "Basmati Rice": basmati_rice,
  "Brown Rice": brown_rice,
  "Aashirvaad Atta": atta,
  "Wheat Flour": wheat_flour,
  "Chana Dal": chana_dal,
  "Toor Dal": toor_dal,
  "Masoor Dal": masoor_dal,
  "Moong Dal": moong_dal,
  "Green Moong": green_moong,
  Chole: chole,
  Rajma: rajma,
  "Soyabean Chunks": soyabean_chunks,
  Salt: salt,
  Sugar: sugar,
  Maggi: maggi,
  Oreo: oreo,
  "Good Day": good_day,
};
import { useApp } from "../context/AppContext";

/* ================= CATEGORIES ================= */

const categories = [
  { name: "All", emoji: "🛒" },
  { name: "Grains", emoji: "🌾" },
  { name: "Pulses", emoji: "🫘" },
  { name: "Essentials", emoji: "🧺" },
  { name: "Snacks", emoji: "🍪" },
];

export default function CustomerDashboard() {
  const { orders, products } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl overflow-hidden shadow-lg mb-10">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-7 sm:p-10 lg:p-12 text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full text-sm mb-5">
                <FaLeaf />
                Fresh groceries everyday
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Everything you need,
                <span className="block text-green-100">all in one place.</span>
              </h2>

              <p className="mt-4 text-green-50 max-w-lg leading-relaxed">
                Explore daily grocery essentials, discover fresh products and
                enjoy a simple shopping experience.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <a
                  href="#products"
                  className="flex items-center gap-2 bg-white text-green-700 px-5 py-3 rounded-xl font-bold hover:bg-green-50 transition shadow-md"
                >
                  Explore Products
                  <FaArrowRight />
                </a>

                <a
                  href="#orders"
                  className="px-5 py-3 rounded-xl font-semibold border border-white/40 hover:bg-white/10 transition"
                >
                  View Orders
                </a>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center p-10">
              <div className="w-72 h-72 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full bg-white/15 flex items-center justify-center">
                  <div className="text-8xl">🛒</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-5">
            <h3 className="text-2xl font-bold text-slate-800">
              Why Shop With Us?
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Everything you need for your everyday grocery shopping
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-4">🛒</div>

              <h4 className="font-bold text-slate-800">Easy Shopping</h4>

              <p className="text-sm text-slate-500 mt-2">
                Browse and find your daily grocery essentials easily.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-4">🥦</div>

              <h4 className="font-bold text-slate-800">Fresh Products</h4>

              <p className="text-sm text-slate-500 mt-2">
                Explore a wide collection of everyday grocery products.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-4">📦</div>

              <h4 className="font-bold text-slate-800">Easy Orders</h4>

              <p className="text-sm text-slate-500 mt-2">
                Keep track of your grocery orders in one place.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-3xl mb-4">✨</div>

              <h4 className="font-bold text-slate-800">Simple Experience</h4>

              <p className="text-sm text-slate-500 mt-2">
                Enjoy a clean and convenient grocery shopping experience.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mb-10">
          <div className="mb-5">
            <h3 className="text-2xl font-bold text-slate-800">
              Shop by Category
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Browse everyday grocery essentials
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border font-medium transition ${
                  selectedCategory === category.name
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

        {/* PRODUCTS */}
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

            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: productImages[product.name],
                }}
              />
            ))}
          </div>
        </section>

        {/* QUICK ACTION */}
        <section
          id="orders"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 items-start"
        >
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800">My Orders</h3>

            <p className="text-sm text-slate-500 mt-1">
              Your recent grocery orders will appear here.
            </p>

            <div className="mt-6 p-6 rounded-xl bg-slate-50 text-center">
              <FaShoppingCart className="mx-auto text-3xl text-slate-300" />

              {orders.length === 0 ? (
                <p className="text-sm text-slate-500 mt-3">
                  No active orders yet.
                </p>
              ) : (
                <div className="mt-5 space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-700">
                          #{order.id}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {order.date}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          ₹{order.total}
                        </p>

                        <span className="text-xs font-semibold text-orange-600">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg h-fit lg:sticky lg:top-24">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-5">
              <FaShoppingCart />
            </div>

            <h3 className="text-2xl font-bold">Ready to shop?</h3>

            <p className="text-slate-300 mt-3 leading-relaxed">
              Explore our grocery collection and choose your daily essentials.
            </p>

            <a
              href="#products"
              className="block text-center mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition"
            >
              Start Shopping
            </a>
          </div>
        </section>

        {/* FOOTER */}
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
