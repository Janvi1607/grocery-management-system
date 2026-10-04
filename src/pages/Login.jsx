import { useState } from "react";
import { FaShoppingCart, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.role === "Store") {
        navigate("/store");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[550px]">
          {/* LEFT SIDE */}
          <div className="bg-gradient-to-br from-green-700 to-emerald-500 text-white p-8 sm:p-12 flex flex-col justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-3xl mb-6">
              <FaShoppingCart />
            </div>

            <p className="flex items-center gap-2 text-green-100 font-medium mb-4">
              <FaLeaf />
              Fresh • Simple • Smart
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Grocery
              <span className="block text-green-100">Management</span>
              System
            </h1>

            <p className="mt-5 text-green-50 leading-relaxed max-w-md">
              Manage your grocery shopping, explore daily essentials and enjoy a
              simple and convenient shopping experience.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <h2 className="text-3xl font-bold text-slate-800">
                Welcome Back!
              </h2>

              <p className="text-slate-500 mt-2 mb-8">
                Login to continue to your account
              </p>

              <form onSubmit={handleLogin}>
                {/* EMAIL */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  />
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition shadow-md"
                >
                  Login
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-6">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}