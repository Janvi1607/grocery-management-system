import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const defaultProducts = [
  { id: 1, name: "Basmati Rice", category: "Grains", price: 120, stock: 45 },
  { id: 2, name: "Aashirvaad Atta", category: "Grains", price: 54, stock: 32 },
  { id: 3, name: "Toor Dal", category: "Pulses", price: 140, stock: 28 },
  { id: 4, name: "Fortune Oil", category: "Essentials", price: 145, stock: 18 },
  { id: 5, name: "Sugar", category: "Essentials", price: 48, stock: 50 },
  { id: 6, name: "Tea", category: "Beverages", price: 180, stock: 24 },
];

export function AppProvider({ children }) {
  /* ================= USER STATE ================= */

  const [user] = useState({
    name: "Janvi Lund",
    email: "janvi@example.com",
    role: "Customer",
  });

  /* ================= ORDERS STATE ================= */

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  /* ================= PRODUCTS STATE ================= */
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || defaultProducts;
  });

  /* ================= PERSIST ORDERS ================= */

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /* ================= PERSIST ORDERS ================= */
  
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  /* ================= CREATE ORDER ================= */

  const createOrder = (cartItems, total) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      customer: user.name,
      items: cartItems,
      amount: total,
      total: total,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  /* ================= UPDATE ORDER ================= */

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  /* ================= CLEAR ORDERS ================= */

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        orders,
        createOrder,
        updateOrderStatus,
        clearOrders,
        products,
        setProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export default AppContext;