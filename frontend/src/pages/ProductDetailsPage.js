import React, { useState, useEffect } from "react";

const ProductDetails = () => {
  // Sample products - replace with backend API later
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Example: Simulating a fetch call
    const fetchProducts = async () => {
      const data = [
        {
          id: 1,
          category: "Electronics",
          name: "Smartphone",
          description: "Latest 5G smartphone with stunning display.",
          price: "₹49,999",
        },
        {
          id: 2,
          category: "Mobiles",
          name: "iPhone 14",
          description: "Apple's latest innovation with A16 Bionic chip.",
          price: "₹79,999",
        },
        {
          id: 3,
          category: "Accessories",
          name: "Wireless Earbuds",
          description: "Noise-cancelling true wireless earbuds.",
          price: "₹4,999",
        },
        {
          id: 4,
          category: "Electronics",
          name: "Smartwatch",
          description: "Fitness tracking and notifications on your wrist.",
          price: "₹9,999",
        },
        {
          id: 5,
          category: "Accessories",
          name: "Bluetooth Speaker",
          description: "Portable speaker with deep bass.",
          price: "₹2,499",
        },
        {
          id: 6,
          category: "Mobiles",
          name: "Tablet",
          description: "Lightweight tablet for entertainment and work.",
          price: "₹24,999",
        },
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f5f5dc",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h2
        style={{ color: "#6b4226", textAlign: "center", marginBottom: "2rem" }}
      >
        Product Details
      </h2>

      <div className="container">
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4">
              <div
                className="card h-100 shadow"
                style={{
                  backgroundColor: "#ffffff",
                  border: "2px solid #6b4226",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Product Image or Placeholder */}
                <div
                  className="card-body d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "250px", color: "#6b4226" }}
                >
                  <h5 style={{ fontWeight: "bold" }}>{product.category}</h5>
                </div>

                {/* Hover Overlay */}
                <div
                  className="hover-overlay d-flex flex-column justify-content-center align-items-center text-center"
                  style={{
                    backgroundColor: "rgba(107, 66, 38, 0.95)",
                    color: "#ffffff",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <h5 style={{ fontWeight: "bold" }}>{product.name}</h5>
                  <p style={{ fontSize: "0.9rem", padding: "0 1rem" }}>
                    {product.description}
                  </p>
                  <p style={{ fontWeight: "bold" }}>{product.price}</p>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#6b4226",
                      border: "2px solid #ffffff",
                      marginTop: "0.5rem",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS to handle hover effect */}
      <style>
        {`
          .card:hover .hover-overlay {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetails;
