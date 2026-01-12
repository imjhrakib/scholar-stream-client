import React from "react";
import useTheme from "../../../hooks/useTheme";

const categories = [
  "Merit-based",
  "Need-based",
  "Country-specific",
  "Undergraduate",
  "Postgraduate",
];

const ScholarshipCategories = () => {
  const { theme, colors } = useTheme();

  return (
    <div
      className="px-6 md:px-16 py-12 rounded-3xl"
      style={{
        backgroundColor: theme === "dark" ? colors.dark.bg : colors.light.bg,
      }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{
          color:
            theme === "dark"
              ? colors.dark.textPrimary
              : colors.light.textPrimary,
        }}
      >
        Scholarship Categories
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="px-5 py-3 rounded-xl font-semibold cursor-pointer transition-transform duration-300"
            style={{
              backgroundColor:
                theme === "dark" ? colors.dark.primary : colors.light.primary,
              color: "#fff",
            }}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipCategories;
