import React from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaTag,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md dark:shadow-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* University Image */}
      {scholarship.photo && (
        <img
          src={scholarship.photo}
          alt={scholarship.universityName}
          className="w-full h-44 object-cover rounded-2xl mb-5 border border-gray-200 dark:border-gray-700"
        />
      )}

      {/* Scholarship Info */}
      <div className="mb-6 flex flex-col gap-3">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {scholarship.scholarshipName}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaUniversity className="text-blue-500 dark:text-blue-400" />
          {scholarship.universityName}
        </p>

        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaTag className="text-purple-500 dark:text-purple-400" />
          {scholarship.scholarshipCategory || "N/A"}
        </p>

        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-500 dark:text-green-400" />
          {scholarship.city}, {scholarship.country}
        </p>

        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <FaMoneyBillWave className="text-yellow-500 dark:text-yellow-400" />
          Application Fee: ${scholarship.applicationFees || "0"}
        </p>
      </div>

      {/* View Details Button */}
      <Link to={`/scholarship/${scholarship._id}`}>
        <button className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 w-full text-center">
          View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default ScholarshipCard;
