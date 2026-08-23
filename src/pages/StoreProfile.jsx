import { FaUser, FaStore, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function StoreProfile() {
  return (
    <main className="p-5 sm:p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm text-green-600 font-semibold">
            Account Management
          </p>

          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            Store Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View and manage your store information.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

          <div className="bg-green-50 p-8 flex flex-col sm:flex-row items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-4xl">
              <FaStore />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-800">
                Grocery Store
              </h2>

              <p className="text-slate-500 mt-1">
                Store Administrator
              </p>

              <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                Active
              </span>
            </div>

          </div>

          {/* INFORMATION */}
          <div className="p-6 sm:p-8">

            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Store Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FaUser className="text-green-600" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Store Owner
                    </p>
                    <p className="font-semibold text-slate-700 mt-1">
                      Store Admin
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-green-600" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Email
                    </p>
                    <p className="font-semibold text-slate-700 mt-1">
                      store@example.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FaStore className="text-green-600" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Store Name
                    </p>
                    <p className="font-semibold text-slate-700 mt-1">
                      Grocery Management Store
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-green-600" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>
                    <p className="font-semibold text-slate-700 mt-1">
                      Mumbai, India
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <button className="mt-7 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Edit Profile
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}