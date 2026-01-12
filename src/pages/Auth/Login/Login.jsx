import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import DemoCredentials from "../../../components/DemoCredentials";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, user } = useAuth();
  const { theme, colors } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    if (user) {
      Swal.fire({
        icon: "info",
        title: "Already Logged In",
        text: "Please logout first",
      });
      return;
    }

    signInUser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <div className="py-5">
      <div
        className="card mx-auto w-full max-w-sm shadow-2xl pt-7 border transition-colors duration-500"
        style={{
          backgroundColor: colors[theme].bgCard,
          color: colors[theme].textPrimary,
          borderColor: colors[theme].border,
        }}
      >
        <h1 className="text-4xl text-center font-bold">Login</h1>

        <h4 className="text-center mt-3 text-sm">
          Don&apos;t have an account?{" "}
          <span
            className="font-semibold"
            style={{ color: colors[theme].primary }}
          >
            <NavLink to="/register" state={location?.state}>
              Register Now
            </NavLink>
          </span>
        </h4>

        {/* Demo Credentials */}
        <div className="mx-5">
          <DemoCredentials />
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset space-y-1">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
                style={{
                  backgroundColor: theme === "dark" ? "#1F1F2A" : "#FFFFFF",
                  color: colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
                style={{
                  backgroundColor: theme === "dark" ? "#1F1F2A" : "#FFFFFF",
                  color: colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters
                </p>
              )}

              <div>
                <Link
                  to="/resetPassword"
                  className="underline text-sm"
                  style={{ color: colors[theme].primary }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                className="btn text-white text-lg border-none mt-4 hover:opacity-90"
                style={{ backgroundColor: colors[theme].primary }}
              >
                Login
              </button>
            </fieldset>
          </form>
          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
