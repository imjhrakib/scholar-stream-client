import React from "react";
import ScholarshipCard from "../../../components/ui/ScholarshipCard";
import { motion } from "framer-motion";

const TopScholarship = () => {
  const scholarships = [
    { name: "Scholarship 1", university: "Uni 1", fee: 0 },
    { name: "Scholarship 2", university: "Uni 2", fee: 100 },
    { name: "Scholarship 3", university: "Uni 3", fee: 50 },
    { name: "Scholarship 4", university: "Uni 4", fee: 0 },
    { name: "Scholarship 5", university: "Uni 5", fee: 20 },
    { name: "Scholarship 6", university: "Uni 6", fee: 0 },
  ];

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
