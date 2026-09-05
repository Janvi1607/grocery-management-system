import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  /* ================= USER STATE ================= */

  const [user] = useState({
    name: "Janvi Lund",
    email: "janvi@example.com",
    role: "Customer",
  });

  /* ================= ORDERS STATE ================= */

  const [orders, setOrders] = useState([]);

  /* ================= PRODUCTS STATE ================= */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();

        const formattedProducts = data.map((product) => ({
          ...product,
          id: product._id,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  /* ================= CREATE ORDER ================= */

  const createOrder = async (cartItems, total) => {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: user.name,
        items: cartItems,
        amount: total,
      }),
    });

    const data = await response.json();

    const newOrder = {
      ...data,
      id: data._id,
      total: data.amount,
      date: data.createdAt,
    };

    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  } catch (error) {
    console.error("Failed to create order:", error);
  }
};

  /* ================= UPDATE ORDER ================= */

  const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...data,
              id: data._id,
              total: data.amount,
              date: data.createdAt,
            }
          : order
      )
    );
  } catch (error) {
    console.error("Failed to update order:", error);
  }
};

/* ================= LOAD ORDER ================= */

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();

      const formattedOrders = data.map((order) => ({
        ...order,
        id: order._id,
        total: order.amount,
        date: order.createdAt,
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  fetchOrders();
}, []);

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
