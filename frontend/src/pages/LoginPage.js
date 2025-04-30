import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const colors = {
    background:  "#FFFFFF",
    navFooter: "#4B5563",
    text:  "#1F2937",
    accent: "#9CA3AF",
    cardBg: "#4B5563",
    inputBg: "#FFFFFF",
    inputText: "#4B5563",
    btnBg: "#E5E7EB",
    btnText: "#4B5563",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      if (token) {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const userRole = decoded.user.role;
        if (userRole === "admin" || userRole === "manager") {
          navigate("/DashboardPage");
        } else {
          navigate("/LandingPage");
        }
      } else {
        setError("No token received. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        color: colors.text,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "24rem",
          borderRadius: "1rem",
          backgroundColor: colors.cardBg,
          color: "#E5E7EB",
        }}
      >
        <h3 className="text-center mb-4">Login</h3>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: colors.inputBg,
                color: colors.inputText,
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: colors.inputBg,
                color: colors.inputText,
              }}
            />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <a
              href="/forgot-password"
              style={{ color: "#E5E7EB", fontSize: "0.9rem" }}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn w-100 mb-2"
            style={{
              backgroundColor: colors.btnBg,
              color: colors.btnText,
              fontWeight: "600",
              border: "none",
            }}
          >
            Login
          </button>

          <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            New user?{" "}
            <a
              href="/signup"
              style={{ color: "#E5E7EB", textDecoration: "underline" }}
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;