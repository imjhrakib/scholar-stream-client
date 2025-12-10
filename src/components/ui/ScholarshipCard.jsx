import React from "react";
import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  console.log(scholarship);
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Scholarship Info */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {scholarship.scholarshipName}
        </h3>
        <p className="text-gray-600 flex items-center gap-2 mb-1">
          <FaUniversity className="text-blue-500" />
          {scholarship.universityName}
        </p>
        <p className="text-gray-600 font-medium">
          Application Fee: ${scholarship.applicationFees}
        </p>
      </div>

      {/* Button */}
      <Link to={`/scholarship/${scholarship._id}`}>
        <button className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-transform duration-300">
          View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default ScholarshipCard;
