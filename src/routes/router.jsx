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
import Analytics from "../pages/DashboardHome/AdminDashboard/AdminAnalytics";
import MyProfile from "../pages/DashboardHome/MyProfile";
import ScholarshipDetails from "../pages/AllScholarships/ScholarshipDetails";
import StudentDashboardHome from "../pages/DashboardHome/StudentDashboard/StudentDashboardHome";
import MyApplications from "../pages/DashboardHome/StudentDashboard/MyApplications";
import MyReview from "../pages/DashboardHome/StudentDashboard/MyReview";
import ManageAppliedApplication from "../pages/DashboardHome/ModeratorDashboard/ManageAppliedApplication";
import ManageReviews from "../pages/DashboardHome/ModeratorDashboard/ManageReviews";
import Payment from "../pages/Payments/PaymentSuccess";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";
import PaymentCancelled from "../pages/Payments/PaymentCancelled";
import ModeratorRoute from "./ModeratorRoute";
import About from "../pages/About/About";

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
        element: (
          <PrivateRoute>
            <AllScholarships></AllScholarships>
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
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
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship></AddScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarship",
        element: (
          <AdminRoute>
            <ManageScholarship></ManageScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics></Analytics>
          </AdminRoute>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      //  moderator dashboard
      {
        path: "manage-application",
        element: (
          <ModeratorRoute>
            <ManageAppliedApplication></ManageAppliedApplication>
          </ModeratorRoute>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <ModeratorRoute>
            <ManageReviews></ManageReviews>
          </ModeratorRoute>
        ),
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
      // payments
      {
        path: "payments",
        element: <Payment></Payment>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: "my-reviews",
        element: <MyReview></MyReview>,
      },
    ],
  },

  {
    path: "*",
    Component: Error404,
  },
]);
