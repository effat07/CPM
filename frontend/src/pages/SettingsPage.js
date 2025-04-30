import React, { useState, useEffect,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext"; // Correct path




const SettingsPage = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    theme: "light",         // theme can be light or dark
    allowRegistration: true // registration toggle
  });

  // Fetch current settings from DB when page loads
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Replace with your real API call
      const response = await fetch("/api/settings");
      const data = await response.json();
      setSettings(data); // Set the state with fetched data
    } catch (error) {
      console.error("Failed to fetch settings", error);
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setSettings((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
  
      // 👇 Immediately update ThemeContext after saving
      toggleTheme(settings.theme);
  
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to save settings", error);
      alert("Failed to update settings!");
    }
  };
  

  return (
    <div
    style={{
      backgroundColor: settings.theme === "dark" ? "#121212" : "#FFFFFF",
      color: settings.theme === "dark" ? "#E5E7EB" : "#1F2937",
      minHeight: "100vh",
    }}
    >
      <nav className="navbar navbar-expand-lg shadow" style={{
  backgroundColor: "#4B5563",
  color: "#E5E7EB",
  padding: "1rem",
}}
>
        <div className="container-fluid d-flex align-items-center justify-content-between">
        <h2
  style={{
    fontFamily: "cursive",
    fontSize: "1.8rem",
    margin: 0,
    color: "#E5E7EB",
  }}
>
  Site Settings
</h2>

        </div>
      </nav>

      <div
  className="p-4 mt-4"
  style={{
    backgroundColor: settings.theme === "dark" ? "#1E1E1E" : "#F9FAFB",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
        <form onSubmit={handleSave}>
          {/* Theme Toggle */}
          <div className="form-group mb-4">
            <label className="form-label">Select Theme</label>
            <select className="form-control" name="theme" value={settings.theme} onChange={handleChange} required>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Registration Toggle */}
          <div className="form-group mb-4">
            <label className="form-label">Allow New User Registration</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="allowRegistration"
                checked={settings.allowRegistration}
                onChange={handleChange}
                id="allowRegistration"
              />
              <label className="form-check-label" htmlFor="allowRegistration">Enable</label>
            </div>
          </div>

          <button type="submit" className="btn" style={{ backgroundColor: "#6b4226", color: "#ffffff", padding: "10px 20px", fontSize: "1.1rem", borderRadius: "8px" }}>
            Save Settings
          </button>
        </form>
      </div>

      <footer
  className="text-center p-4 mt-5"
  style={{
    backgroundColor: "#4B5563",
    color: "#E5E7EB",
  }}
>
  <p>
    <a
      href="/admin"
      style={{
        color: "#E5E7EB",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Admin Panel
    </a>{" "}
    |{" "}
    <a
      href="/"
      style={{
        color: "#E5E7EB",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      ShopiTech
    </a>
  </p>
</footer>

    </div>
  );
};

export default SettingsPage;
