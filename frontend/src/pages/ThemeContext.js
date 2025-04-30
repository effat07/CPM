
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data?.theme) setTheme(data.theme);
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    fetchTheme();
  }, []);

  
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};