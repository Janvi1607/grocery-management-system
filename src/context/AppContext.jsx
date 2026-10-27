import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import socket from "../socket";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("SOCKET BACKEND URL:", API_URL);
const AppContext = createContext();

export function AppProvider({ children }) {
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  /* ================= USER STATE ================= */
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  /* ================= ORDERS STATE ================= */

  const [orders, setOrders] = useState([]);

  const addOrder = useCallback((order) => {
    const formattedOrder = {
      ...order,
      id: order._id,
      total: order.amount,
      date: order.createdAt,
    };

    setOrders((prev) => {
      if (prev.some((item) => item.id === formattedOrder.id)) {
        return prev;
      }

      return [formattedOrder, ...prev];
    });
  }, []);

  /* ================= SOCKET.IO CONNECTION ================= */

  useEffect(() => {
    if (!token || !user) {
      socket.disconnect();
      return;
    }

    // Authenticate the shared socket before connecting.
    socket.auth = { token };

    const handleConnect = () => {
      console.log("Socket connected:", socket.id, "Role:", user.role);
    };

    const handleConnectError = (error) => {
      console.error("Socket connection failed:", error.message);
    };

    const handleOrderConfirmation = (order) => {
      if (user.role === "Customer") {
        alert(
          `Order placed successfully!\n` +
            `Order ID: ${order._id}\n` +
            `Amount: ₹${order.amount}`,
        );
      }
    };

    const handleNewOrder = (order) => {
      if (user.role === "Store") {
        console.log("New order received by Store:", order);
        addOrder(order);

        alert(
          `New order received!\n` +
            `Order ID: ${order._id}\n` +
            `Customer: ${order.customer}\n` +
            `Amount: ₹${order.amount}`,
        );
      }
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("order-confirmation", handleOrderConfirmation);
    socket.on("new-order", handleNewOrder);

    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("order-confirmation", handleOrderConfirmation);
      socket.off("new-order", handleNewOrder);
      socket.disconnect();
    };
  }, [token, user, addOrder]);

  /* ================= PRODUCTS STATE ================= */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
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
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
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
      const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

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
            : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  /* ================= LOAD ORDER ================= */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) return;

        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            logout();
            setOrders([]);
          }

          throw new Error(data.message || "Failed to fetch orders");
        }

        if (!Array.isArray(data)) {
          throw new Error("Orders response is not a valid list");
        }

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
  }, [token]);

  /* ================= CLEAR ORDERS ================= */

  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        orders,
        createOrder,
        addOrder,
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
