import React from "react";
import { Link } from "react-router";

const ModeratorDashboardHome = () => {
  return (
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Moderator Dashboard
      </h2>

      <div className="flex flex-col gap-4">
        {/* Home */}
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg text-center hover:bg-indigo-600 transition"
        >
          Home
        </Link>
        <Link
          to="/dashboard/manage-application"
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg text-center hover:bg-emerald-600 transition"
        >
          Manage Application
        </Link>

        {/* Manage Applications */}
        <Link
          to="/dashboard/manage-reviews"
          className="px-6 py-3 bg-violet-500 text-white rounded-lg text-center hover:bg-violet-600 transition"
        >
          Manage Reviews
        </Link>
      </div>
    </div>
  );
};

export default ModeratorDashboardHome;
