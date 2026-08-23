import {
  FaSearch,
  FaArrowRight,
  FaLeaf,
  FaShoppingCart,
} from "react-icons/fa";

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

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

/*** Products List */
const products = [
  {
    id: 1,
    name: "Basmati Rice",
    category: "Grains",
    price: 120,
    unit: "1 kg",
    image: basmati_rice,
  },

  {
    id: 2,
    name: "Brown Rice",
    category: "Grains",
    price: 120,
    unit: "1 kg",
    image: brown_rice,
  },

  {
    id: 3,
    name: "Aashirvaad Atta",
    category: "Grains",
    price: 54,
    unit: "1 kg",
    image: atta,
  },

  {
    id: 4,
    name: "Fortune Atta",
    category: "Grains",
    price: 53,
    unit: "1 kg",
    image: wheat_flour,
  },

  {
    id: 5,
    name: "Chana Dal",
    category: "Pulses",
    price: 50,
    unit: "1 kg",
    image: chana_dal,
  },

  {
    id: 6,
    name: "Toor Dal",
    category: "Pulses",
    price: 130,
    unit: "1 kg",
    image: toor_dal,
  },

  {
    id: 7,
    name: "Masoor Dal",
    category: "Pulses",
    price: 40,
    unit: "1 kg",
    image: masoor_dal,
  },

  {
    id: 8,
    name: "Moong Dal",
    category: "Pulses",
    price: 30,
    unit: "1 kg",
    image: moong_dal,
  },

  {
    id: 9,
    name: "Green Moong",
    category: "Pulses",
    price: 60,
    unit: "1 kg",
    image: green_moong,
  },

  {
    id: 10,
    name: "Rajma",
    category: "Pulses",
    price: 50,
    unit: "1 kg",
    image: rajma,
  },

  {
    id: 11,
    name: "Chole",
    category: "Pulses",
    price: 40,
    unit: "1 kg",
    image: chole,
  },

  {
    id: 12,
    name: "Soyabean Chunks",
    category: "Pulses",
    price: 120,
    unit: "1 kg",
    image: soyabean_chunks,
  },

  {
    id: 13,
    name: "Salt",
    category: "Essentials",
    price: 30,
    unit: "1 kg",
    image: salt,
  },

  {
    id: 14,
    name: "Sugar",
    category: "Essentials",
    price: 80,
    unit: "1 kg",
    image: sugar,
  },

  {
    id: 15,
    name: "Maggi",
    category: "Snacks",
    price: 20,
    unit: "1 packet",
    image: maggi,
  },

  {
    id: 16,
    name: "Oreo",
    category: "Snacks",
    price: 10,
    unit: "1",
    image: oreo,
  },
];

/* ================= CATEGORIES ================= */

const categories = [
  { name: "All", emoji: "🛒" },
  { name: "Grains", emoji: "🌾" },
  { name: "Pulses", emoji: "🫘" },
  { name: "Essentials", emoji: "🧺" },
  { name: "Snacks", emoji: "🍪" },
];

export default function CustomerDashboard() {
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
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* QUICK ACTION */}
        <section
          id="orders"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
        >
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800">My Orders</h3>

            <p className="text-sm text-slate-500 mt-1">
              Your recent grocery orders will appear here.
            </p>

            <div className="mt-6 p-6 rounded-xl bg-slate-50 text-center">
              <FaShoppingCart className="mx-auto text-3xl text-slate-300" />

              <p className="text-sm text-slate-500 mt-3">
                No active orders yet.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
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
