import React from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router";
import useTheme from "../../hooks/useTheme";

const ScholarshipCard = ({ scholarship }) => {
  const { theme, colors } = useTheme();

  // Determine colors based on theme
  const bgCard = theme === "dark" ? colors.dark.bgCard : colors.light.bgCard;
  const textPrimary =
    theme === "dark" ? colors.dark.textPrimary : colors.light.textPrimary;
  const textSecondary =
    theme === "dark" ? colors.dark.textSecondary : colors.light.textSecondary;
  const border = theme === "dark" ? colors.dark.border : colors.light.border;

  return (
    <motion.div
      className="p-6 rounded-3xl shadow-md border flex flex-col justify-between overflow-hidden"
      style={{
        backgroundColor: bgCard,
        color: textPrimary,
        border: `1px solid ${border}`,
      }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* University Image */}
      {scholarship.photo && (
        <img
          src={scholarship.photo}
          alt={scholarship.universityName}
          className="w-full h-44 object-cover rounded-2xl mb-5"
          style={{ border: `1px solid ${border}` }}
        />
      )}

      {/* Scholarship Info */}
      <div className="mb-6 flex flex-col gap-3">
        <h3 style={{ color: textPrimary }} className="text-2xl font-bold">
          {scholarship.scholarshipName}
        </h3>

        <p style={{ color: textSecondary }} className="flex items-center gap-2">
          <FaUniversity style={{ color: "#4FD1C5" }} />
          {scholarship.universityName}
        </p>

        <p style={{ color: textSecondary }} className="flex items-center gap-2">
          <FaTag style={{ color: "#7F5AF0" }} />
          {scholarship.scholarshipCategory || "N/A"}
        </p>

        <p style={{ color: textSecondary }} className="flex items-center gap-2">
          <FaMapMarkerAlt style={{ color: "#38B2AC" }} />
          {scholarship.city}, {scholarship.country}
        </p>

        <p style={{ color: textSecondary }} className="flex items-center gap-2">
          <FaMoneyBillWave style={{ color: "#F6E05E" }} />
          Application Fee: ${scholarship.applicationFees || "0"}
        </p>
      </div>

      {/* View Details Button */}
      <Link to={`/scholarship/${scholarship._id}`}>
        <button
          className="mt-auto px-5 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 w-full text-center"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to right, #4FD1C5, #38B2AC)"
                : "linear-gradient(to right, #3B82F6, #6366F1)",
            color: "#fff",
          }}
        >
          View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default ScholarshipCard;
