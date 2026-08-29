import { FaBox, FaPlus, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function StoreProducts() {
  const { products, setProducts } = useApp();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

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
            onClick={() => setShowModal(true)}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
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
        {/* Add Product Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-50">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-slate-800">
                  Add Product
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
                  placeholder="Product name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (
                      !newProduct.name ||
                      !newProduct.category ||
                      !newProduct.price ||
                      !newProduct.stock
                    ) {
                      return;
                    }

                    const product = {
                      id: Date.now(),
                      name: newProduct.name,
                      category: newProduct.category,
                      price: Number(newProduct.price),
                      stock: Number(newProduct.stock),
                    };

                    setProducts((prev) => [...prev, product]);

                    setNewProduct({
                      name: "",
                      category: "",
                      price: "",
                      stock: "",
                    });

                    setShowModal(false);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
