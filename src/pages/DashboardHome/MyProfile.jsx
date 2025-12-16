import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: profile = [] } = useQuery({
    queryKey: ["myProfile", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}/myProfile`);
      return result.data;
    },
  });

  const role = profile?.role || "student";
  const joinedAt = profile?.createdAt || "2025-01-01";

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-xl p-6 text-center">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-400 hover:border-blue-600 mb-4"
          />
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-500">{user?.email}</p>

          <span
            className={`mt-3 px-4 py-1 rounded-full text-sm text-white ${
              role === "admin"
                ? "bg-red-500"
                : role === "moderator"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {role.toUpperCase()}
          </span>

          <p className="text-sm text-gray-400 mt-2">
            Joined on: {new Date(joinedAt).toDateString()}
          </p>
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Full Name:</span>
            <span>{user?.displayName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span>{role}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Account Status:</span>
            <span className="text-green-600">Active</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 justify-center">
        <button className="btn btn-primary px-6">Edit Profile</button>
        <button className="btn btn-warning px-6">Change Password</button>
        <button onClick={logOut} className="btn btn-error px-6">
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
