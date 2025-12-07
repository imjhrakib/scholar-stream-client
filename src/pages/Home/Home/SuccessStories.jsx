import React from "react";
import { motion } from "framer-motion";
const SuccessStories = () => {
  return (
    <div>
      <div className="space-y-20 px-6 lg:px-20 py-10">
        {/* Success Stories */}
        <motion.section
          className="bg-gray-100 p-10 rounded-lg space-y-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold">Success Stories</h2>
          <p>Read how students achieved their dreams through scholarships.</p>
        </motion.section>
      </div>
    </div>
  );
};

export default SuccessStories;
