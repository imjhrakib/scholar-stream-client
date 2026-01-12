import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxios from "../../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, colors } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password).then(() => {
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;

      axios.post(image_API_URL, formData).then((res) => {
        const photoURL = res.data.data.url;

        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL,
        };

        axiosSecure.post("/users", userInfo);

        updateUserProfile({
          displayName: data.name,
          photoURL,
        });
      });

      navigate(location?.state || "/");
      Swal.fire({
        icon: "success",
        title: "Welcome to ScholarStream 🎓",
        timer: 1500,
        showConfirmButton: false,
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
        <h1 className="text-4xl text-center font-bold">Register</h1>

        <h4 className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <span
            className="font-semibold"
            style={{ color: colors[theme].primary }}
          >
            <NavLink to="/login" state={location?.state}>
              Login Now
            </NavLink>
          </span>
        </h4>

        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset space-y-1">
              {/* Photo */}
              <label className="label">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                style={{
                  backgroundColor: theme === "dark" ? "#1F1F2A" : "#FFFFFF",
                  color: colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              />
              {errors.photo && (
                <p className="text-red-500 text-sm">Photo is required</p>
              )}

              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
                style={{
                  backgroundColor: theme === "dark" ? "#1F1F2A" : "#FFFFFF",
                  color: colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}

              {/* Email */}
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

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                })}
                className="input"
                placeholder="Password"
                style={{
                  backgroundColor: theme === "dark" ? "#1F1F2A" : "#FFFFFF",
                  color: colors[theme].textPrimary,
                  borderColor: colors[theme].border,
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Strong password required</p>
              )}

              {/* Button */}
              <button
                className="btn text-white text-lg border-none mt-4 hover:opacity-90"
                style={{ backgroundColor: colors[theme].primary }}
              >
                Register
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

export default Register;
