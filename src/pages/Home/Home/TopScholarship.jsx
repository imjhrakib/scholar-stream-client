import React, { useEffect, useState } from "react";
import ScholarshipCard from "../../../components/ui/ScholarshipCard";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const TopScholarship = () => {
  const axios = useAxios();

  const { data: scholarships = [] } = useQuery({
    queryKey: ["top-scholarship"],
    queryFn: async () => {
      const result = await axios.get("/scholarships/top");
      return result.data;
    },
  });

  return (
    <div className="p-10">
      <h2 className="text-3xl text-center font-bold mb-6">Top Scholarships</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scholarships.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <ScholarshipCard scholarship={s} />
          </motion.div>
        ))}
      </div>
      {/* Show All Button */}
      <div className="flex justify-center mt-8">
        <Link
          to="/scholarships"
          className="px-8 py-3 rounded-xl 
    bg-gradient-to-r from-blue-600 to-indigo-600 
    text-white font-semibold 
    shadow-md hover:shadow-xl 
    hover:scale-105 transition-all duration-300"
        >
          Show All Scholarships →
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;
