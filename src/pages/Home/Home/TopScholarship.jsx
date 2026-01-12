import React from "react";
import ScholarshipCard from "../../../components/ui/ScholarshipCard";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useTheme from "../../../hooks/useTheme";

const TopScholarship = () => {
  const axios = useAxios();
  const { theme, colors } = useTheme();

  const { data: scholarships = [] } = useQuery({
    queryKey: ["top-scholarship"],
    queryFn: async () => {
      const result = await axios.get("/scholarships/top");
      return result.data;
    },
  });

  return (
    <div
      className={`px-6 md:px-16 py-16 rounded-3xl transition-colors`}
      style={{
        backgroundColor: theme === "dark" ? colors.dark.bg : colors.light.bg,
      }}
    >
      {/* Section Heading */}
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-2"
        style={{ color: theme === "dark" ? "#F3F4F6" : "#1E3A8A" }}
      >
        Top Scholarships for You
      </h2>
      <p
        className="text-center mb-8"
        style={{ color: theme === "dark" ? "#D1D5DB" : "#3B82F6" }}
      >
        Discover the most popular scholarships that match your profile and
        goals.
      </p>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

      {/* Explore All Scholarships Button */}
      <div className="flex justify-center mt-10">
        <Link
          to="/scholarships"
          className="px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to right, #7F1DFF, #2563EB)" // vibrant gradient for dark
                : "linear-gradient(to right, #3B82F6, #60A5FA)", // bright gradient for light
            color: "white",
          }}
        >
          Explore Scholarships →
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;
