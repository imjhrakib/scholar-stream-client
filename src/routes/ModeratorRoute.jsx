import React, { Children } from "react";
import Loading from "../components/ui/Loading";
import Forbidden from "../components/ui/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ModeratorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "moderator") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default ModeratorRoute;
