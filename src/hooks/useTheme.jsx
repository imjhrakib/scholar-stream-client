import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const themes = useContext(ThemeContext);
  return themes;
};

export default useTheme;
