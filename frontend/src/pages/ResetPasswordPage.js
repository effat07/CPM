import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reset-password/${token}`,
        { password }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: "#f5f5f5", padding: "30px", borderRadius: "8px" }}>
      <h2 className="text-center" style={{ color: "#1F2937" }}>Reset Your Password</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto", backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <div className="mb-3">
          <label style={{ color: "#1F2937" }}>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              borderColor: "#4B5563",
              borderRadius: "5px",
              padding: "10px",
              color: "#1F2937",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{
            backgroundColor: "#4B5563",
            borderColor: "#4B5563",
            padding: "10px",
            fontSize: "16px",
            color: "#FFFFFF",
            borderRadius: "5px",
          }}
        >
          Reset Password
        </button>
      </form>

      {message && <p className="text-success mt-3 text-center">{message}</p>}
      {error && <p className="text-danger mt-3 text-center">{error}</p>}
      
      <div className="text-center mt-3">
        <Link to="/" style={{ color: "#4B5563", textDecoration: "none", fontSize: "16px", height: "100%" }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
