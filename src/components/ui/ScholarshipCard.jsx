import React from "react";
import { motion } from "framer-motion";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250 }}
    >
      {/* Scholarship Info */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {scholarship.name}
        </h3>
        <p className="text-gray-600 mb-1">
          University: {scholarship.university}
        </p>
        <p className="text-gray-600 mb-2">Fee: ${scholarship.fee}</p>
      </div>

      {/* Button */}
      <button className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        View Details
      </button>
    </motion.div>
  );
};

export default ScholarshipCard;
