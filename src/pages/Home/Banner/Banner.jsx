import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSearch } from "react-icons/bi";

import img1 from "../../../assets/banner1.png";
import img2 from "../../../assets/banner2.png";
import img3 from "../../../assets/banner3.png";
import { NavLink } from "react-router";

const images = [img1, img2, img3];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden min-h-[60vh] md:min-h-[80vh]">
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
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />

      {/* CTA */}
      <div className="absolute bottom-10 left-24 md:left-20 md:bottom-20 z-20">
        <NavLink
          to={"/scholarships"}
          className="flex items-center gap-2 px-6 py-3 text-white 
          bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition"
        >
          <BiSearch />
          Search Scholarships
        </NavLink>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full ${
              current === index
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
