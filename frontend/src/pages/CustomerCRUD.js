import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./ThemeContext"; // Adjust path if needed

const CustomerCRUD = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const colors = {
    background: isDark ? "#121212" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#374151",
    card: isDark ? "#1E293B" : "#F9FAFB",
    border: isDark ? "#374151" : "#E5E7EB",
    inputBg: isDark ? "#374151" : "#FFFFFF",
    accent: isDark ? "#E5E7EB" : "#6B7280",
    button: isDark ? "#FFFFFF" : "#6B7280",
    navFooter: "#4B5563",
  };

  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/customers`, {
        params: { page, limit, sortBy, order },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
      setError("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, order, limit, sortBy]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    try {
      await axios.post("/api/customers", formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      fetchCustomers();
      setSuccessMessage("Customer added successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add customer");
    }
  };

  const handleEditCustomer = (customer) => {
    setFormData({
      name: customer.name,
      address: customer.address,
      email: customer.email,
      phone: customer.phone,
    });
    setEditingCustomerId(customer._id);
    setIsEditing(true);
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    try {
      await axios.put(`/api/customers/${editingCustomerId}`, formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      setIsEditing(false);
      setEditingCustomerId(null);
      fetchCustomers();
      setSuccessMessage("Customer updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update customer");
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    setError(null);
    try {
      await axios.delete(`/api/customers/${id}`);
      setPage((p) => (customers.length === 1 && p > 1 ? p - 1 : p));
      fetchCustomers();
      setSuccessMessage("Customer deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete customer");
    }
  };

  const toggleSortOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  if (loading) return <div className="text-center mt-5">Loading customers...</div>;

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h2 className="mb-4" style={{ color: colors.text }}>Manage Customers</h2>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form
        onSubmit={isEditing ? handleUpdateCustomer : handleAddCustomer}
        className="p-4 mb-5"
        style={{
          backgroundColor: colors.card,
          borderRadius: "10px",
          border: `1px solid ${colors.border}`,
          width: "100%",
        }}
      >
        <div className="row g-3">
          {["name", "email", "address", "phone"].map((field) => (
            <div key={field} className="col-md-6">
              <label className="form-label" htmlFor={field} style={{ color: colors.text }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="form-control"
                required={["name", "email"].includes(field)}
                style={{
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="btn me-2"
            style={{
              backgroundColor: colors.accent,
              color: isDark ? "#121212" : "#FFFFFF",
            }}
          >
            {isEditing ? "Update Customer" : "Add Customer"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                setIsEditing(false);
                setEditingCustomerId(null);
                setFormData({ name: "", address: "", email: "", phone: "" });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={toggleSortOrder}
          style={{ color: colors.text, borderColor: colors.border }}
        >
          Sort by Date ({order === "asc" ? "↑ Oldest" : "↓ Newest"})
        </button>

        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span style={{ color: colors.text }}>Page {page}</span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => setPage((p) => p + 1)}
            disabled={customers.length < limit}
          >
            Next
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table
          className="table"
          style={{
            backgroundColor: colors.card,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}
        >
          <thead style={{ backgroundColor: colors.inputBg }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || "-"}</td>
                  <td>{customer.address || "-"}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteCustomer(customer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerCRUD;
