import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const ProductCrud = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    productCode: "",
    description: "",
    isPublished: false,
  });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const colors = {
    primaryBrown: "#6b4226",
    lightBeige: "#f8f4e9",
    mediumBeige: "#e8d8c3",
    darkBeige: "#d2c0a5",
    accentBrown: "#8b5a2b",
    textDark: "#3e3e3e",
    textLight: "#ffffff",
  };

  const tableStyles = {
    backgroundColor: colors.lightBeige,
    borderColor: colors.mediumBeige,
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const headerStyles = {
    backgroundColor: colors.primaryBrown,
    color: colors.textLight,
    fontWeight: "500",
    borderBottom: `1px solid ${colors.accentBrown}`,
  };

  const buttonStyles = {
    primary: {
      backgroundColor: colors.primaryBrown,
      borderColor: colors.primaryBrown,
      fontWeight: "500",
      letterSpacing: "0.5px",
    },
    secondary: {
      backgroundColor: colors.mediumBeige,
      borderColor: colors.darkBeige,
      color: colors.textDark,
      fontWeight: "500",
    },
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL+
        `/api/products?page=${currentPage}&limit=${productsPerPage}`
      );
      setProducts(res.data.data); // Make sure your API returns { data: [...] }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_BASE_URL+"/api/products", formData);
      setProducts([...products, res.data]);
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add product", err);
      alert(err.response?.data?.message || "Failed to add product");
    }
  };
  const handleEditProduct = (product) => {
    if (!product) return;
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      productCode: product.productCode,
      description: product.description,
      isPublished: product.isPublished,
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!currentProduct) return;
    try {
      const res = await axios.put(process.env.REACT_APP_BASE_URL+
        `/api/products/${currentProduct._id}`,
        formData
      );
      setProducts(
        products.map((p) => (p._id === currentProduct._id ? res.data : p))
      );
      resetForm();
      setCurrentProduct(null);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(process.env.REACT_APP_BASE_URL+`/api/products/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setProductToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      productCode: "",
      description: "",
      isPublished: false,
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mt-4" style={{ color: "#6b4226" }}>
        Manage Products
      </h2>

      <div className="my-4">
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          style={{ backgroundColor: "#6b4226", borderColor: "#6b4226" }}
        >
          ➕ Add Product
        </Button>
      </div>

      <div className="table-responsive">
        <table
          className="table table-bordered"
          style={{ backgroundColor: "#f5f5dc" }}
        >
          <thead style={{ backgroundColor: "#ffffff", color: "#6b4226" }}>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Description</th>
              <th>Is Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.productCode}</td>
                <td>{product.description}</td>
                <td>{product.isPublished ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditProduct(product)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setProductToDelete(product);
                      setShowDeleteModal(true);
                    }}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductCode">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                value={formData.productCode}
                onChange={(e) =>
                  setFormData({ ...formData, productCode: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsPublished">
              <Form.Check
                type="checkbox"
                label="Is Published"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowAddModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Add Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProduct}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductCode">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                value={formData.productCode}
                onChange={(e) =>
                  setFormData({ ...formData, productCode: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsPublished">
              <Form.Check
                type="checkbox"
                label="Is Published"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Update Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Product Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductCrud;
