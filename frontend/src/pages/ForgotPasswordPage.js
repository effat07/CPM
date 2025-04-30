import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        className="shadow"
        style={{
          backgroundColor: "#F3F4F6",
          padding: "2rem",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          color: "#4B5563",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#4B5563" }}
        >
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "500" }}>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#D1D5DB",
                color: "#4B5563",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#4B5563",
              color: "#E5E7EB",
              fontWeight: "500",
              border: "none",
            }}
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <div
            className="alert alert-success mt-3 text-center"
            style={{ fontSize: "0.95rem" }}
          >
            {message}
          </div>
        )}
        {error && (
          <div
            className="alert alert-danger mt-3 text-center"
            style={{ fontSize: "0.95rem" }}
          >
            {error}
          </div>
        )}

        <div className="mt-3 text-center">
          <Link to="/" style={{ color: "#4B5563", textDecoration: "none" }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
