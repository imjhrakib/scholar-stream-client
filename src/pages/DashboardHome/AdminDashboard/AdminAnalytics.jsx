import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../../hooks/useTheme";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { theme, colors } = useTheme();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: scholarships = [] } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  const { data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const totalUsers = users.length;
  const totalScholarships = scholarships.length;
  const totalFees = applications.reduce(
    (sum, app) => sum + (app.applicationFees || 0),
    0
  );

  const chartData = [];
  applications.forEach((app) => {
    const existing = chartData.find((c) => c.name === app.universityName);
    if (existing) existing.applications += 1;
    else chartData.push({ name: app.universityName, applications: 1 });
  });

  return (
    <div
      className="p-6 space-y-6 min-h-screen"
      style={{
        backgroundColor: colors[theme].bg,
        color: colors[theme].textPrimary,
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Platform Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        <div
          className="p-6 rounded-lg shadow text-center w-full md:w-64"
          style={{
            backgroundColor: colors[theme].primary,
            color: colors[theme].textOnPrimary,
          }}
        >
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div
          className="p-6 rounded-lg shadow text-center w-full md:w-64"
          style={{
            backgroundColor: colors[theme].success,
            color: colors[theme].textOnPrimary,
          }}
        >
          <h3 className="text-lg font-semibold">Total Fees Collected</h3>
          <p className="text-3xl font-bold">${totalFees}</p>
        </div>

        <div
          className="p-6 rounded-lg shadow text-center w-full md:w-64"
          style={{
            backgroundColor: colors[theme].secondary,
            color: colors[theme].textOnPrimary,
          }}
        >
          <h3 className="text-lg font-semibold">Total Scholarships</h3>
          <p className="text-3xl font-bold">{totalScholarships}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        className="p-6 rounded-lg shadow flex justify-center"
        style={{ backgroundColor: colors[theme].bgCard }}
      >
        <div className="w-full md:w-3/4">
          <h3
            className="text-xl font-semibold mb-4 text-center"
            style={{ color: colors[theme].textPrimary }}
          >
            Applications per University
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={colors[theme].border}
              />
              <XAxis dataKey="name" stroke={colors[theme].textSecondary} />
              <YAxis stroke={colors[theme].textSecondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors[theme].bgCard,
                  color: colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              />
              <Legend wrapperStyle={{ color: colors[theme].textPrimary }} />
              <Bar dataKey="applications" fill={colors[theme].primary} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div
        className="p-6 rounded-lg shadow flex justify-center"
        style={{ backgroundColor: colors[theme].bgCard }}
      >
        <div className="w-full md:w-3/4 flex justify-center">
          <div>
            <h3
              className="text-xl font-semibold mb-4 text-center"
              style={{ color: colors[theme].textPrimary }}
            >
              Applications Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="applications"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: colors[theme].bgCard,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
