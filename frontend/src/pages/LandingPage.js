import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaShoppingCart, FaCog } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";

const LandingPage = () => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const colors = {
    background: isDark ? "#121212" : "#FFFFFF",
    navFooter: "#4B5563",
    text: isDark ? "#E5E7EB" : "#1F2937",
    accent: "#9CA3AF",
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <nav
        className="shadow-sm"
        style={{
          backgroundColor: colors.navFooter,
          padding: "1rem 2rem",
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div
            className="navbar-brand"
            style={{
              color: colors.text,
              fontSize: "2rem",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            ShopiTech
          </div>

          <div className="d-flex gap-4">
            {["Shop All", "Mobiles", "Accessories", "About Us"].map((item, index) => (
              <span
                key={index}
                className="nav-link"
                style={{
                  color: colors.text,
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
                onMouseLeave={(e) => (e.target.style.opacity = 1)}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="d-flex gap-3">
            {[FaUserCircle, FaSearch, FaShoppingCart, FaCog].map((Icon, idx) => (
              <span
                key={idx}
                style={{
                  color: colors.text,
                  fontSize: "1.4rem",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
                onClick={() => {
                  if (Icon === FaCog) {
                    
                    const confirmLogout = window.confirm("Are you sure you want to logout?");
                    if (confirmLogout) {
                      localStorage.removeItem("authToken"); 
                      navigate("/"); 
                    }
                  }
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                <Icon />
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="flex-grow-1 d-flex align-items-center justify-content-center text-center"
        style={{
          padding: "4rem 1rem",
          backgroundColor: colors.background,
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <h1
            style={{
              color: colors.navFooter,
              fontSize: "3.2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Welcome to ShopiTech
          </h1>
          <p
            style={{
              color: colors.accent,
              fontSize: "1.2rem",
              lineHeight: "1.8",
            }}
          >
            Your one-stop tech store for the latest gadgets, mobile devices, and stylish accessories. Quality products, seamless service.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center"
        style={{
          backgroundColor: colors.navFooter,
          color: colors.text,
          padding: "2rem 1rem",
          marginTop: "auto",
        }}
      >
        <div style={{ fontSize: "1.1rem" }}>📞 +91 9876543210</div>
        <div>📧 support@shopitech.com</div>
        <div>📍 Kolhapur, Maharashtra, India</div>
      </footer>
    </div>
  );
};

export default LandingPage;
