import React from "react";
import useTheme from "../../../hooks/useTheme";

const Newsletter = () => {
  const { theme, colors } = useTheme();

  const bgSection = colors[theme].bgCard;
  const textPrimary = colors[theme].textPrimary;
  const textSecondary = colors[theme].textSecondary;
  const borderColor = colors[theme].border;
  const primaryColor = colors[theme].primary;

  return (
    <div
      className="px-6 md:px-16 py-12 text-center shadow-lg transition-colors duration-500"
      style={{ backgroundColor: bgSection }}
    >
      {/* Heading */}
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: textPrimary }}
      >
        Stay Updated with Scholarships
      </h2>

      {/* Description */}
      <p className="mb-6 md:text-lg" style={{ color: textSecondary }}>
        Subscribe to get the latest scholarships and study abroad updates
        delivered to your inbox.
      </p>

      {/* Form */}
      <form className="flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 py-3 rounded-xl w-full md:w-1/3 border focus:outline-none transition-colors duration-300"
          style={{
            backgroundColor: theme === "dark" ? "#1F1F2A" : "#FFFFFF",
            color: textPrimary,
            borderColor: borderColor,
          }}
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          style={{
            backgroundColor: primaryColor,
            color: "#FFFFFF",
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
