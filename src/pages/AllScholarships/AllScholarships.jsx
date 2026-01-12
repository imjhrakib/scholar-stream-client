import React, { useEffect, useState } from "react";
import ScholarshipCard from "../../components/ui/ScholarshipCard";
import { motion } from "framer-motion";
import { TiThMenu } from "react-icons/ti";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTheme from "../../hooks/useTheme";

const AllScholarships = () => {
  const axios = useAxios();
  const { theme, colors } = useTheme();

  const [showSidebar, setShowSidebar] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/scholarships/search", {
          params: { search, country, sort, page, limit },
        });
        setScholarships(res.data.result);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchData();
  }, [search, country, sort, page, limit, axios]);

  return (
    <div style={{ backgroundColor: colors[theme].bgPage, minHeight: "100vh" }}>
      <div className="flex relative">
        {/* Sidebar */}
        <div
          className={`sm:mt-9 sm:rounded-r-2xl sm:shadow fixed sm:static top-0 left-0 h-full sm:h-auto z-50 sm:z-30 w-64 sm:w-2/12 p-4 transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          }`}
          style={{
            backgroundColor: colors[theme].bgCard,
            color: colors[theme].textPrimary,
          }}
        >
          {/* Mobile Close Button */}
          <div className="flex justify-between items-center mb-4 sm:hidden">
            <h3 className="font-semibold">Filters</h3>
            <button onClick={() => setShowSidebar(false)} className="text-xl">
              <IoMdCloseCircleOutline />
            </button>
          </div>

          <p className="font-semibold mb-2">Scholarship Filters</p>
          <div className="space-y-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="select w-full"
              style={{
                backgroundColor: theme === "dark" ? "#1F1F2A" : "#F5F5F5",
                color: colors[theme].textPrimary,
                borderColor: colors[theme].border,
              }}
            >
              <option value={""}>Country</option>
              <option value={"USA"}>USA</option>
              <option value={"United Kingdom"}>United Kingdom</option>
              <option value={"Canada"}>Canada</option>
              <option value={"Singapore"}>Singapore</option>
              <option value={"Switzerland"}>Switzerland</option>
              <option value={"New Zealand"}>New Zealand</option>
              <option value={"Australia"}>Australia</option>
              <option value={"Denmark"}>Denmark</option>
              <option value={"China"}>China</option>
              <option value={"Japan"}>Japan</option>
              <option value={"Hong Kong"}>Hong Kong</option>
              <option value={"Germany"}>Germany</option>
            </select>

            <button
              onClick={() => setShowSidebar(false)}
              className="btn w-full"
              style={{ backgroundColor: colors[theme].primary, color: "#fff" }}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-40 sm:hidden"
            style={{
              backgroundColor:
                theme === "dark" ? "rgba(0,0,0,0.7)" : "rgba(200,200,200,0.5)",
            }}
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Main Content */}
        <div
          className="flex-1 m-3 sm:m-5 p-3 sm:p-4 pt-0 w-full"
          style={{ backgroundColor: colors[theme].bgPage }}
        >
          {/* Top Bar */}
          <div
            className="flex flex-col mb-6 lg:flex-row lg:gap-3 sm:gap-0 justify-between items-start p-4 rounded-xl shadow-lg"
            style={{
              backgroundColor: colors[theme].bgCard,
              color: colors[theme].textPrimary,
            }}
          >
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowSidebar(true)}
              className="btn sm:hidden"
              style={{ backgroundColor: colors[theme].primary, color: "#fff" }}
            >
              <TiThMenu /> Filters
            </button>

            <div className="flex flex-col w-full gap-4 mb-2.5 lg:w-2/3 lg:flex-row">
              <p
                className="font-semibold text-2xl mb-2"
                style={{ color: colors[theme].textPrimary }}
              >
                Scholarships
              </p>
              <input
                type="text"
                placeholder="Search by scholarship, university or degree..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered md:w-2/3 lg:w-4/6 lg:gap-2.5 pl-5 pr-4 h-10 rounded-full hover:shadow-md transition-all duration-300"
                style={{
                  backgroundColor: theme === "dark" ? "#1F1F2A" : "#fff",
                  color: colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              />
            </div>

            <div className="ml-2 flex justify-between gap-5 flex-nowrap items-center whitespace-nowrap">
              {/* Show */}
              <div className="flex items-center gap-2">
                <h4
                  style={{
                    color: colors[theme].textSecondary,
                    fontWeight: 600,
                  }}
                >
                  Show:
                </h4>
                <select
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="select h-8"
                  style={{
                    backgroundColor: theme === "dark" ? "#1F1F2A" : "#F5F5F5",
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                >
                  <option value={"6"}>6</option>
                  <option value={"12"}>12</option>
                  <option value={"18"}>18</option>
                  <option value={"24"}>24</option>
                  <option value={"30"}>30</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex gap-2 items-center">
                <h4
                  style={{
                    color: colors[theme].textSecondary,
                    fontWeight: 600,
                  }}
                >
                  Sort by:
                </h4>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="select"
                  style={{
                    backgroundColor: theme === "dark" ? "#1F1F2A" : "#F5F5F5",
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                >
                  <option value={""}>Newest</option>
                  <option value={"feeLow"}>Low → High</option>
                  <option value={"feeHigh"}>High → Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scholarship Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg border transition`}
                style={{
                  backgroundColor:
                    page === i + 1
                      ? colors[theme].primary
                      : colors[theme].bgCard,
                  color: page === i + 1 ? "#fff" : colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;
