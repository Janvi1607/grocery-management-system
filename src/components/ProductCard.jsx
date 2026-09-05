import useCart from "../hooks/useCart";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function ProductCard({ product }) {
  const {
    cart,
    addToCart,
    decreaseQuantity,
  } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* IMAGE AREA */}
      <div className="h-44 bg-green-50 flex items-center justify-center relative">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-contain group-hover:scale-105 transition duration-300"
        />

        <span className="absolute top-3 left-3 bg-white/90 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </span>

      </div>

      {/* DETAILS */}
      <div className="p-5">

        <h4 className="font-bold text-lg text-slate-800">
          {product.name}
        </h4>

        <p className="text-sm text-slate-500 mt-1">
          {product.unit || "1 pack"}
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

          {/* QUANTITY */}
          <div className="flex items-center gap-2">

            <button
              onClick={() => {
                if (quantity > 0) {
                  decreaseQuantity(product.id);
                }
              }}
              disabled={quantity === 0}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                quantity === 0
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <FaMinus className="text-xs" />
            </button>

            <span className="w-8 text-center font-bold text-slate-700">
              {quantity}
            </span>

            <button
              onClick={() => addToCart(product)}
              className="w-9 h-9 rounded-lg bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
            >
              <FaPlus className="text-xs" />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}