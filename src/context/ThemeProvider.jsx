import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const colors = {
    dark: {
      bg: "#1E1E2F",
      bgNav: "#2C2F41",
      bgCard: "#3A3F55",
      textPrimary: "#E0E0E0",
      textSecondary: "#A0A0B0",
      primary: "#4FD1C5",
      primaryHover: "#38B2AC",
      accent: "#7F5AF0",
      border: "#3A3F55",
    },
    light: {
      bg: "#F5F7FA",
      bgNav: "#E0F2F1",
      bgCard: "#FFFFFF",
      textPrimary: "#1F2937",
      textSecondary: "#6B7280",
      primary: "#0ABAB5",
      primaryHover: "#06A89F",
      accent: "#7F5AF0",
      border: "#E0F2F1",
    },
  };

  useEffect(() => {
    document.body.style.backgroundColor = colors[theme].bg;
    document.body.style.color = colors[theme].textPrimary;
  }, [theme]);

  return (
    <ThemeContext value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext>
  );
};

export default ThemeProvider;
