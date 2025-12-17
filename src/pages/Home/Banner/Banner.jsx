import React from "react";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFF] to-[#EEF3FF] py-28">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find the Perfect Scholarship
          <span className="text-blue-600"> for Your Future</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-slate-600 mt-5 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Access thousands of verified scholarships tailored to your academic
          achievements, skills, and financial needs—all in one trusted platform.
        </motion.p>

        {/* Search Button */}
        <Link to={"/scholarships"}>
          <motion.button
            className="mt-10 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <BiSearch size={22} />
            Search Scholarship
          </motion.button>
        </Link>
      </div>

      {/* Decorative circles */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-blue-300/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Banner;
