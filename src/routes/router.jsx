import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Error404 from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import AdminDashboardHome from "../pages/DashboardHome/AdminDashboard/AdminDashboardHome";
import ManageUser from "../pages/DashboardHome/AdminDashboard/ManageUser";
import AddScholarship from "../pages/DashboardHome/AdminDashboard/AddScholarship";
import ManageScholarship from "../pages/DashboardHome/AdminDashboard/ManageScholarship";
import Analytics from "../pages/DashboardHome/AdminDashboard/Analytics";
import MyProfile from "../pages/DashboardHome/MyProfile";
import ScholarshipDetails from "../pages/AllScholarships/ScholarshipDetails";
import StudentDashboardHome from "../pages/DashboardHome/StudentDashboard/StudentDashboardHome";
import MyApplications from "../pages/DashboardHome/StudentDashboard/MyApplications";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "scholarships",
        Component: AllScholarships,
      },
      {
        path: "scholarship/:id",
        element: <ScholarshipDetails></ScholarshipDetails>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // admin dashboard
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "add-scholarship",
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "manage-scholarship",
        element: <ManageScholarship></ManageScholarship>,
      },
      {
        path: "manage-users",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "analytics",
        element: <Analytics></Analytics>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      // student dashboard
      {
        path: "student-dashboard",
        element: <StudentDashboardHome></StudentDashboardHome>,
      },
      {
        path: "my-application",
        element: <MyApplications></MyApplications>,
      },
    ],
  },
  {
    path: "*",
    Component: Error404,
  },
]);
