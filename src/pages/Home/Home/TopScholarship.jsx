import React, { useEffect, useState } from "react";
import ScholarshipCard from "../../../components/ui/ScholarshipCard";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TopScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure.get("/scholarships");
        setScholarships(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchScholarships();
  }, [axiosSecure]);

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
    </div>
  );
};

export default TopScholarship;
