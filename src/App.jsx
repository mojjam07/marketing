import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProductsProvider } from "./components/context/ProductsContext";
import Login from "../src/components/Auth/Login";
import Register from "../src/components/Auth/Register";
import Dashboard from "../src/components/Dashboard/Dashboard";
import PublicDashboard from "../src/components/Dashboard/PublicDashboard";
import UserProfile from "../src/components/Auth/UserProfile"; // Importing the new component
import OrderManagement from "../src/components/Dashboard/OrderManagement"; // Importing OrderManagement
import Notification from "../src/components/Dashboard/Notification"; // Importing Notification
import AnalyticsDashboard from "../src/components/Dashboard/AnalyticsDashboard"; // Importing AnalyticsDashboard
import { AuthProvider } from "./components/context/AuthContext";
import { CartProvider } from "./components/context/CartContext"; // Importing CartProvider
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/orders" element={<OrderManagement />} />{" "}
            {/* New route for order management */}
            <Route path="/notifications" element={<Notification />} />{" "}
            {/* New route for notifications */}
            <Route path="/analytics" element={<AnalyticsDashboard />} />{" "}
            {/* New route for analytics */}
            <Route path="/" element={<PublicDashboard />} />
          </Routes>
          </Router>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
