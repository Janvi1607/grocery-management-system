import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/CustomerDashboard";

import StoreLayout from "./components/StoreLayout";
import StoreDashboard from "./pages/StoreDashboard";
import StoreProducts from "./pages/StoreProducts";
import StoreOrders from "./pages/StoreOrders";
import Statistics from "./pages/Statistics";
import StoreProfile from "./pages/StoreProfile";

import { CartProvider } from "./context/CartContext";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <CartProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/customer" element={<CustomerDashboard />} />

            <Route path="/store" element={<StoreLayout />}>
              <Route index element={<StoreDashboard />} />
              <Route path="products" element={<StoreProducts />} />
              <Route path="orders" element={<StoreOrders />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="profile" element={<StoreProfile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </CartProvider>
  );
}

export default App;
