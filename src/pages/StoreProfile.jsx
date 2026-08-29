import { FaUser, FaStore, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function StoreProfile() {
  const [showModal, setShowModal] = useState(false);

  const [profile, setProfile] = useState(() => {
  return (
    JSON.parse(localStorage.getItem("storeProfile")) || {
      owner: "Store Admin",
      email: "store@example.com",
      storeName: "Grocery Management Store",
      location: "Mumbai, India",
    }
  );
});

useEffect(() => {
  localStorage.setItem("storeProfile", JSON.stringify(profile));
}, [profile]);

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
                {profile.storeName}
              </h2>

              <p className="text-slate-500 mt-1">Store Administrator</p>

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
                    <p className="text-xs text-slate-400">Store Owner</p>
                    <p className="font-semibold text-slate-700 mt-1">
                      {profile.owner}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-green-600" />
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="font-semibold text-slate-700 mt-1">
                      {profile.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FaStore className="text-green-600" />
                  <div>
                    <p className="text-xs text-slate-400">Store Name</p>
                    <p className="font-semibold text-slate-700 mt-1">
                      {profile.storeName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-green-600" />
                  <div>
                    <p className="text-xs text-slate-400">Location</p>
                    <p className="font-semibold text-slate-700 mt-1">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-7 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-slate-800">
                Edit Profile
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={profile.owner}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    owner: e.target.value,
                  })
                }
                placeholder="Store Owner"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                value={profile.storeName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    storeName: e.target.value,
                  })
                }
                placeholder="Store Name"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    location: e.target.value,
                  })
                }
                placeholder="Location"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
