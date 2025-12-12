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
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();

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
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Platform Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-500 text-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-emerald-500 text-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Fees Collected</h3>
          <p className="text-3xl font-bold">${totalFees}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Scholarships</h3>
          <p className="text-3xl font-bold">{totalScholarships}</p>
        </div>
      </div>

      {/* Bar Chart: Applications per University */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Applications per University
        </h3>
        <BarChart
          width={"100%"}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="applications" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Pie Chart: Applications Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Applications Distribution
        </h3>
        <PieChart width={"100%"} height={300}>
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
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminAnalytics;
