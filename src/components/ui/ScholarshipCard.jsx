import React from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";
import useTheme from "../../hooks/useTheme";

const ScholarshipCard = ({ scholarship }) => {
  const { theme, colors } = useTheme();

  const bgCard = colors[theme].bgCard;
  const textPrimary = colors[theme].textPrimary;
  const textSecondary = colors[theme].textSecondary;
  const border = colors[theme].border;

  return (
    <motion.div
      className="p-4 rounded-2xl shadow-md border flex flex-col justify-between overflow-hidden h-full"
      style={{
        backgroundColor: bgCard,
        color: textPrimary,
        border: `1px solid ${border}`,
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* University Image */}
      {scholarship.photo && (
        <img
          src={scholarship.photo}
          alt={scholarship.universityName}
          className="w-full h-32 object-cover rounded-xl mb-4"
          style={{ border: `1px solid ${border}` }}
        />
      )}

      {/* Scholarship Info */}
      <div className="flex flex-col gap-2 mb-4 flex-1">
        {/* Scholarship Name */}
        <h3
          className="text-lg font-semibold line-clamp-2"
          style={{ color: textPrimary }}
          title={scholarship.scholarshipName}
        >
          {scholarship.scholarshipName}
        </h3>

        {/* University */}
        <p
          className="flex items-center gap-2 text-sm line-clamp-1"
          style={{ color: textSecondary }}
          title={scholarship.universityName}
        >
          <FaUniversity className="text-teal-400" />
          {scholarship.universityName}
        </p>

        {/* Fee */}
        <p
          className="flex items-center gap-2 text-sm"
          style={{ color: textSecondary }}
        >
          <FaMoneyBillWave className="text-yellow-400" />
          Fee: ${scholarship.applicationFees || 0}
        </p>
      </div>

      {/* View Details Button */}
      <Link to={`/scholarship/${scholarship._id}`}>
        <button
          className="mt-auto px-4 py-2 rounded-xl font-medium shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 w-full text-center text-white"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to right, #4FD1C5, #38B2AC)"
                : "linear-gradient(to right, #3B82F6, #6366F1)",
          }}
        >
          View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default ScholarshipCard;
