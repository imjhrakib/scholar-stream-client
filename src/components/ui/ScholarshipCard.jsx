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
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between  overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* University Image */}
      {scholarship.photo && (
        <img
          src={scholarship.photo}
          alt={scholarship.universityName}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
      )}
      {/* Scholarship Info */}
      <div className="mb-6 flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-gray-900 ">
          {scholarship.scholarshipName}
        </h3>

        <p className="text-gray-600 flex items-center gap-2">
          <FaUniversity className="text-blue-500" />
          {scholarship.universityName}
        </p>

        <p className="text-gray-600 flex items-center gap-2 ">
          <FaTag className="text-purple-500" />
          {scholarship.scholarshipCategory || "N/A"}
        </p>

        <p className="text-gray-600 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-500" />
          {scholarship.city}, {scholarship.country}
        </p>

        <p className="text-gray-600 flex items-center gap-2">
          <FaMoneyBillWave className="text-yellow-500" />
          Application Fee: ${scholarship.applicationFees || "0"}
        </p>
      </div>
      {/* View Details Button */}
      <Link to={`/scholarship/${scholarship._id}`}>
        <button className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 w-full text-center">
          View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default ScholarshipCard;
