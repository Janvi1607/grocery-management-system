import { useState } from "react";
import useCart from "../hooks/useCart";

import {
  FaShoppingCart,
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaUserCircle,
  FaTimes,
  FaMinus,
  FaPlus,
  FaTrash,
  FaBars,
} from "react-icons/fa";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <FaHome />,
      href: "#home",
    },
    {
      id: "products",
      label: "Products",
      icon: <FaBoxOpen />,
      href: "#products",
    },
    {
      id: "orders",
      label: "Orders",
      icon: <FaClipboardList />,
      href: "#orders",
    },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            {/* ================= LOGO ================= */}

            <div className="flex items-center gap-3 flex-shrink-0">

              <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-sm">
                <FaShoppingCart />
              </div>

              <div className="block">
                <h1 className="font-bold text-lg text-slate-800">
                  Grocery Management
                </h1>

                <p className="text-xs text-green-600 font-medium">
                  Fresh • Simple • Smart
                </p>
              </div>

            </div>


            {/* ================= DESKTOP NAVIGATION ================= */}

            <div className="hidden md:flex flex-1 items-center justify-center gap-7 mx-6">

              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActive(item.id)}
                  className={`flex items-center gap-2 text-sm font-semibold transition ${
                    active === item.id
                      ? "text-green-600"
                      : "text-slate-500 hover:text-green-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}

            </div>


            {/* ================= RIGHT SIDE ================= */}

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

              {/* MOBILE HAMBURGER */}

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden p-2 text-slate-600 hover:text-green-600 transition"
                aria-label="Open menu"
              >
                {showMenu ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>


              {/* CART */}

              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-slate-500 hover:text-green-600 transition"
              >
                <FaShoppingCart className="text-lg" />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>


              {/* DESKTOP PROFILE */}

              <button
                onClick={() => setShowProfile(true)}
                className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-green-600 transition"
              >
                <FaUserCircle className="text-xl" />

                <span className="text-sm font-semibold">
                  Profile
                </span>
              </button>

            </div>

          </div>

        </div>
      </nav>


      {/* ================= MOBILE MENU ================= */}

      {showMenu && (
        <div className="md:hidden sticky top-16 z-40 bg-white border-b border-slate-200 shadow-md">

          <div className="px-4 py-3 space-y-1">

            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActive(item.id);
                  setShowMenu(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                  active === item.id
                    ? "bg-green-50 text-green-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}


            {/* MOBILE PROFILE */}

            <button
              onClick={() => {
                setShowProfile(true);
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold transition"
            >
              <FaUserCircle />
              Profile
            </button>

          </div>

        </div>
      )}


      {/* ================= CART MODAL ================= */}

      {showCart && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
          onClick={() => setShowCart(false)}
        >

          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-slate-100">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Your Cart
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {cartCount} item{cartCount !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={() => setShowCart(false)}
                className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
              >
                <FaTimes />
              </button>

            </div>


            {/* CART CONTENT */}

            <div className="max-h-[55vh] overflow-y-auto p-5">

              {cart.length === 0 ? (

                <div className="py-12 text-center">

                  <FaShoppingCart className="mx-auto text-4xl text-slate-300" />

                  <h3 className="font-bold text-slate-700 mt-4">
                    Your cart is empty
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Add some products to your cart.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-3 sm:gap-4 border border-slate-100 rounded-xl p-3"
                    >

                      {/* IMAGE */}

                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />

                      </div>


                      {/* DETAILS */}

                      <div className="flex-1 min-w-0">

                        <h4 className="font-semibold text-slate-800 truncate">
                          {item.name}
                        </h4>

                        <p className="text-sm text-green-600 font-semibold">
                          ₹{item.price}
                        </p>


                        {/* QUANTITY */}

                        <div className="flex items-center gap-2 mt-2">

                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-7 h-7 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-green-100 hover:text-green-600"
                          >
                            <FaMinus className="text-[10px]" />
                          </button>

                          <span className="text-sm font-bold w-5 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => addToCart(item)}
                            className="w-7 h-7 rounded-md bg-green-600 text-white flex items-center justify-center hover:bg-green-700"
                          >
                            <FaPlus className="text-[10px]" />
                          </button>

                        </div>

                      </div>


                      {/* TOTAL + DELETE */}

                      <div className="text-right flex-shrink-0">

                        <p className="font-bold text-slate-700">
                          ₹{item.price * item.quantity}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-600 mt-2 flex items-center gap-1"
                        >
                          <FaTrash />
                          <span className="hidden sm:inline">
                            Remove
                          </span>
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>


            {/* FOOTER */}

            {cart.length > 0 && (

              <div className="border-t border-slate-100 p-5">

                <div className="flex items-center justify-between mb-4">

                  <span className="text-slate-500">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-green-600">
                    ₹{cartTotal}
                  </span>

                </div>

                <button
                  onClick={() => setShowCart(false)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition"
                >
                  Checkout
                </button>

              </div>

            )}

          </div>

        </div>
      )}


      {/* ================= PROFILE MODAL ================= */}

      {showProfile && (

        <div
          className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
          onClick={() => setShowProfile(false)}
        >

          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* PROFILE HEADER */}

            <div className="bg-green-600 p-6 text-white">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  My Profile
                </h2>

                <button
                  onClick={() => setShowProfile(false)}
                  className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                >
                  <FaTimes />
                </button>

              </div>


              <div className="flex items-center gap-4 mt-6">

                <div className="w-16 h-16 rounded-full bg-white text-green-600 flex items-center justify-center text-3xl">
                  <FaUserCircle />
                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    Janvi Lund
                  </h3>

                  <p className="text-green-100 text-sm">
                    Customer
                  </p>

                </div>

              </div>

            </div>


            {/* PROFILE DETAILS */}

            <div className="p-6 space-y-5">

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Name
                </p>

                <p className="font-semibold text-slate-700 mt-1">
                  Janvi Lund
                </p>
              </div>


              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Email
                </p>

                <p className="font-semibold text-slate-700 mt-1">
                  janvi@example.com
                </p>
              </div>


              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Account Type
                </p>

                <p className="font-semibold text-green-600 mt-1">
                  Customer
                </p>
              </div>


              <button
                onClick={() => setShowProfile(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}