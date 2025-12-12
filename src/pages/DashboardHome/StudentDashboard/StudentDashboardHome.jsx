import React from "react";
import { Link } from "react-router";

const StudentDashboardHome = () => {
  return (
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Dashboard</h2>

      <div className="flex flex-col gap-4">
        {/* Home */}
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg text-center hover:bg-indigo-600 transition"
        >
          Home
        </Link>

        {/* My Application */}
        <Link
          to="/dashboard/my-application"
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-center hover:bg-emerald-600 transition"
        >
          My Application
        </Link>

        {/* My Reviews */}
        <Link
          to="/dashboard/my-reviews"
          className="px-6 py-3 bg-sky-500 text-white rounded-lg text-center hover:bg-sky-600 transition"
        >
          My Reviews
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
