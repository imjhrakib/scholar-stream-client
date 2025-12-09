import React from "react";
import ModeratorDashboardHome from "./ModeratorDashboardHome";
import useRole from "../../hooks/useRole";
import Loading from "../../components/ui/Loading";
import UserDashboardHome from "./UserDashboardHome";
import AdminDashboardHome from "./AdminDashboard/AdminDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "moderator") {
    return <ModeratorDashboardHome></ModeratorDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashboardHome;
