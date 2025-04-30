import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCrud from "./pages/ProductCrud";
import CustomerCRUD from "./pages/CustomerCRUD";
import ResetPassword from "./pages/ResetPasswordPage";
import { ThemeProvider } from "./pages/ThemeContext";

function App() {
  return (
    <ThemeProvider> {
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/DashboardPage" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductCrud />} />
        <Route path="/customers" element={<CustomerCRUD />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>}
    </ThemeProvider>
  );
    }

export default App;
