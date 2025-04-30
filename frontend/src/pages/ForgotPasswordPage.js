import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        {
          email,
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
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
        className="card p-4 shadow"
        style={{
          width: "24rem",
          borderRadius: "1rem",
          backgroundColor: colors.cardBg,
          color: "#E5E7EB",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#FFFFFF" }}>
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#FFFFFF" }}>
              Enter your email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: "#E5E7EB", text: "#1F2937",border: "none" }}
          >
            Send Reset Link
          </button>
        </form>

        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="mt-3 text-center">
          <Link to="/" style={{ color: "#E5E7EB", textDecoration: "none" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;