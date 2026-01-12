import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTheme from "../../hooks/useTheme";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { theme, colors } = useTheme();
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#438A7A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            icon: "success",
            title: "Logged out",
            text: "You have been logged out successfully",
            timer: 1500,
            showConfirmButton: false,
          });
          setProfileOpen(false);
          setMobileOpen(false);
          navigate("/");
        });
      }
    });
  };

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
    <div
      className="max-w-3xl mx-auto p-6"
      style={{ color: colors[theme].textPrimary }}
    >
      {/* Profile Header */}
      <div
        className="shadow rounded-xl p-6 text-center"
        style={{ backgroundColor: colors[theme].bgCard }}
      >
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 mb-4"
            style={{
              borderColor:
                role === "admin"
                  ? "#ef4444"
                  : role === "moderator"
                  ? "#3b82f6"
                  : "#22c55e",
            }}
          />
          <h2
            className="text-2xl font-bold"
            style={{ color: colors[theme].textPrimary }}
          >
            {user?.displayName}
          </h2>
          <p style={{ color: colors[theme].textSecondary }}>{user?.email}</p>

          <span
            className="mt-3 px-4 py-1 rounded-full text-sm text-white"
            style={{
              backgroundColor:
                role === "admin"
                  ? "#ef4444"
                  : role === "moderator"
                  ? "#3b82f6"
                  : "#22c55e",
            }}
          >
            {role.toUpperCase()}
          </span>

          <p
            style={{ color: colors[theme].textSecondary }}
            className="text-sm mt-2"
          >
            Joined on: {new Date(joinedAt).toDateString()}
          </p>
        </div>
      </div>

      {/* Basic Info Section */}
      <div
        className="shadow rounded-xl p-6 mt-6"
        style={{ backgroundColor: colors[theme].bgCard }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: colors[theme].textPrimary }}
        >
          Basic Information
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span
              className="font-medium"
              style={{ color: colors[theme].textPrimary }}
            >
              Full Name:
            </span>
            <span style={{ color: colors[theme].textSecondary }}>
              {user?.displayName}
            </span>
          </div>

          <div className="flex justify-between">
            <span
              className="font-medium"
              style={{ color: colors[theme].textPrimary }}
            >
              Email:
            </span>
            <span style={{ color: colors[theme].textSecondary }}>
              {user?.email}
            </span>
          </div>

          <div className="flex justify-between">
            <span
              className="font-medium"
              style={{ color: colors[theme].textPrimary }}
            >
              Role:
            </span>
            <span style={{ color: colors[theme].textSecondary }}>{role}</span>
          </div>

          <div className="flex justify-between">
            <span
              className="font-medium"
              style={{ color: colors[theme].textPrimary }}
            >
              Account Status:
            </span>
            <span style={{ color: "#22c55e" }}>Active</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 justify-center">
        <button className="btn btn-primary px-6">Edit Profile</button>
        <button className="btn btn-warning px-6">Change Password</button>
        <button onClick={handleLogOut} className="btn btn-error px-6">
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
