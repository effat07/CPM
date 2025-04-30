import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const colors = {
    background: isDark ? "#121212" : "#FFFFFF",
    navFooter: "#4B5563",
    text: isDark ? "#E5E7EB" : "#1F2937",
    accent: "#9CA3AF",
    cardBg: isDark ? "#1E1E1E" : "#F9FAFB",
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        transition: "all 0.3s ease",
      }}
    >
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: colors.navFooter }} variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold fs-3" style={{ color: colors.text }}>
            Admin Panel
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate("/products")}
            >
              Products
            </Button>
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate("/customers")}
            >
              Customers
            </Button>
            <Button
              variant="outline-light"
              onClick={() => navigate("/settings")}
            >
              Settings
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Dashboard Content */}
      <Container className="flex-grow-1 py-5">
        <h2 className="text-center mb-5" style={{ color: colors.navFooter }}>
          Welcome to Admin Panel
        </h2>
        <Row className="g-4 justify-content-center">
          {[
            { label: "Revenue", value: "$153,000" },
            { label: "Sales", value: "20" },
            { label: "Customers", value: "20" },
            { label: "Employees", value: "20" },
          ].map((stat, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card
                className="text-center shadow-sm border-0"
                style={{
                  backgroundColor: colors.cardBg,
                  transition: "background-color 0.3s",
                }}
              >
                <Card.Body>
                  <h6 className="mb-2" style={{ color: colors.navFooter }}>
                    {stat.label}
                  </h6>
                  <h4 style={{ color: isDark ? "#E5E7EB" : "#1F2937" }}>
                    {stat.value}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer
        className="text-center py-3 mt-auto"
        style={{
          backgroundColor: colors.navFooter,
          color: colors.text,
        }}
      >
        © 2025 ShopiTech
      </footer>
    </div>
  );
};

export default AdminDashboard;
