import React, { useState } from "react";
import ScholarshipCard from "../../components/ui/ScholarshipCard";
import { motion } from "framer-motion";

const AllScholarships = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const scholarships = [
    { name: "Scholarship 1", university: "Uni 1", fee: 0 },
    { name: "Scholarship 2", university: "Uni 2", fee: 100 },
    { name: "Scholarship 3", university: "Uni 3", fee: 50 },
    { name: "Scholarship 4", university: "Uni 4", fee: 0 },
    { name: "Scholarship 5", university: "Uni 5", fee: 20 },
    { name: "Scholarship 6", university: "Uni 6", fee: 0 },
  ];

  return (
    <div className="bg-[#F2F4F8] min-h-screen">
      <div className="flex relative">
        {/* sidebar */}
        <div
          className={` sm:mt-9 sm:rounded-r-2xl sm:shadow
            fixed sm:static top-0 left-0 h-full sm:h-auto z-50 sm:z-30
            w-64 sm:w-2/12 bg-white  p-4
            transition-transform duration-300
            ${
              showSidebar
                ? "translate-x-0"
                : "-translate-x-full sm:translate-x-0"
            }
          `}
        >
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center mb-4 sm:hidden">
            <h3 className="font-semibold">Filters</h3>
            <button onClick={() => setShowSidebar(false)} className="text-xl">
              ✕
            </button>
          </div>

          <p className="font-semibold mb-2">Scholarship Filters</p>
          <div className="space-y-3">
            <select className="select w-full bg-gray-100">
              <option>Country</option>
              <option>USA</option>
              <option>UK</option>
            </select>

            <select className="select w-full bg-gray-100">
              <option>Degree</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>

            <select className="select w-full bg-gray-100">
              <option>Category</option>
              <option>Full Fund</option>
              <option>Partial</option>
            </select>

            <button className="btn btn-primary w-full">Apply Filters</button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Main Content  */}
        <div className="flex-1   m-3 sm:m-5 p-3 sm:p-4 pt-0 bg-[#F2F4F8] w-full">
          {/* Top Bar */}
          <div className="mb-3 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center   p-4 bg-white rounded-xl shadow-lg">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowSidebar(true)}
              className="btn  sm:hidden"
            >
              ☰ Filters
            </button>

            <p className="font-semibold text-lg">Scholarships</p>

            <div className=" flex gap-5 flex-nowrap items-center whitespace-nowrap">
              {/* Show */}
              <div className="flex items-center gap-2">
                <h4 className="text-gray-500 font-semibold">Show:</h4>
                <select className="select h-8 bg-[#F2F4F8]">
                  <option>10</option>
                  <option>14</option>
                  <option>18</option>
                  <option>22</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex gap-2 items-center">
                <h4 className="text-gray-500 font-semibold ">Sort by:</h4>
                <select className="select bg-[#F2F4F8]">
                  <option>Newest</option>
                  <option>Low → High</option>
                  <option>High → Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scholarship Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {scholarships.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ScholarshipCard scholarship={s} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;
