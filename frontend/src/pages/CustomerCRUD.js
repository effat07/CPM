import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; // Adjust path if needed

const CustomerCRUD = () => {
  const { theme } = useContext(ThemeContext);
const isDark = theme === "dark";
const colors = {
  background: isDark ? "#121212" : "#FFFFFF",
  text: isDark ? "#E5E7EB" : "#1F2937",
  card: isDark ? "#1E1E1E" : "#F9FAFB",
  border: isDark ? "#2D2D2D" : "#E5E7EB",
  navbarFooter: "#4B5563",
};

  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

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
    setSuccessMessage(""); // Reset success message
    try {
      await axios.post("/api/customers", formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      fetchCustomers();
      setSuccessMessage("Customer added successfully!"); // Set success message
    } catch (err) {
      console.error(
        "Failed to add customer",
        err.response?.data || err.message
      );
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
    setSuccessMessage(""); // Reset success message
    try {
      await axios.put(`/api/customers/${editingCustomerId}`, formData);
      setFormData({ name: "", address: "", email: "", phone: "" });
      setEditingCustomerId(null);
      setIsEditing(false);
      fetchCustomers();
      setSuccessMessage("Customer updated successfully!"); // Set success message
    } catch (err) {
      console.error(
        "Failed to update customer",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to update customer");
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    setError(null);
    try {
      await axios.delete(`/api/customers/${id}`);
      if (customers.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchCustomers();
      }
      setSuccessMessage("Customer deleted successfully!"); // Set success message on delete
    } catch (err) {
      console.error(
        "Failed to delete customer",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to delete customer");
    }
  };

  const toggleSortOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading customers...</div>;
  }

  return (
    <div className="container mt-4"
    style={{
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: "100vh",
      padding: "2rem",
      borderRadius: "12px",}}>
      <h2 style={{ color: "#6b4226" }}>Manage Customers</h2>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Add / Edit Form */}
      <form
        onSubmit={isEditing ? handleUpdateCustomer : handleAddCustomer}
        className="mb-4 p-3 border rounded"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12">
            <button className="btn btn-success me-2">
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
        </div>
      </form>

      {/* Sorting and Pagination Controls */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-primary" onClick={toggleSortOrder}>
          Sort by Date ({order === "asc" ? "↑ Oldest" : "↓ Newest"})
        </button>

        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2">Page {page}</span>
          <button
            className="btn btn-outline-primary"
            onClick={() => setPage((p) => p + 1)}
            disabled={customers.length < limit}
          >
            Next
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="table-responsive">
        <table className="table table-hover"
        style={{
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          color: colors.text,
        }}>
          <thead className="table-light" style={{ backgroundColor: colors.card, color: colors.text }}          >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: colors.background }}>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || "-"}</td>
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
                <td colSpan="4" className="text-center">
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
