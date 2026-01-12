import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { NavLink } from "react-router";
import useTheme from "../../../hooks/useTheme";

import img1 from "../../../assets/banner1.png";
import img2 from "../../../assets/banner2.png";
import img3 from "../../../assets/banner3.png";

const images = [img1, img2, img3];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const { theme, colors } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Theme-aware button colors
  const btnBg = theme === "dark" ? colors.dark.primary : colors.light.primary;
  const btnHover =
    theme === "dark" ? colors.dark.primaryHover : colors.light.primaryHover;

  return (
    <section className="relative w-full overflow-hidden min-h-[60vh] md:min-h-[80vh]">
      {/* Banner Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 bg-center bg-no-repeat bg-contain md:bg-cover"
          style={{ backgroundImage: `url(${images[current]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.2)",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(to top, rgba(0,0,0,0.6), transparent)"
              : "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
        }}
      />

      {/* CTA Button */}
      <div className="absolute bottom-10 left-6 md:left-20 md:bottom-20 z-20">
        <NavLink
          to={"/scholarships"}
          className="flex items-center gap-2 px-6 py-3 text-white rounded-full shadow-lg transition-transform transform hover:scale-105"
          style={{ background: btnBg }}
          onMouseEnter={(e) => (e.currentTarget.style.background = btnHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
        >
          <BiSearch className="text-white w-5 h-5" />
          Search Scholarships
        </NavLink>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-transform ${
              current === index ? "scale-110" : "opacity-50 hover:opacity-100"
            }`}
            style={{
              background: theme === "dark" ? "#fff" : "#000",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
