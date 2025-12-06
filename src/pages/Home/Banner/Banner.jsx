import React from "react";
import { BiSearch } from "react-icons/bi";
import SecondaryBtn from "../../../components/ui/SecondaryBtn";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFF] to-[#EEF3FF] py-28">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_60%)]"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Find the Perfect Scholarship
          <span className="text-blue-600"> for Your Future</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mt-5 max-w-2xl mx-auto leading-relaxed">
          Access thousands of verified scholarships tailored to your academic
          achievements, skills, and financial needs—all in one trusted platform.
        </p>

        <button className="mt-10 inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all">
          <BiSearch size={22} />
          Search Scholarship
        </button>
      </div>

      {/* Decorative circles (professional vibe) */}
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-blue-300/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Banner;
