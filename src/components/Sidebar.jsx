import {
  FaChartBar,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaStore,
  FaBox,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const menuItems = [
    { name: "Dashboard", path: "/store", icon: <FaHome /> },
    { name: "Products", path: "/store/products", icon: <FaBox /> },
    { name: "Orders", path: "/store/orders", icon: <FaClipboardList /> },
    { name: "Statistics", path: "/store/statistics", icon: <FaChartBar /> },
    { name: "Profile", path: "/store/profile", icon: <FaUser /> },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 bg-green-600 text-white p-3 rounded-lg shadow-lg"
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
            fixed top-0 z-50
            w-64 h-screen bg-white text-slate-700
            border-r border-slate-200 shadow-sm p-5 flex flex-col
            transform transition-transform duration-300

            right-0
            ${open ? "translate-x-0" : "translate-x-full"}

            md:left-0
            md:right-auto
            md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-end md:hidden mb-2">
          <button onClick={() => setOpen(false)}>
            <FaTimes className="text-xl text-slate-600" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <FaStore />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Grocery Store</h2>
            <p className="text-xs text-slate-500">Store Panel</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/store"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-slate-600 hover:bg-green-50 hover:text-green-600"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <button className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </aside>
    </>
  );
}
