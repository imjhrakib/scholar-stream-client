import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import SocialLogin from "../SocialLogin/SocialLogin.jsx";
import useAxios from "../../../hooks/useAxios.jsx";
import Swal from "sweetalert2";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    registerUser(data.email, data.password).then((result) => {
      // store the image and get the photo url
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;

      axios.post(image_API_URL, formData).then((res) => {
        const photoURL = res.data.data.url;
        //create user in the database
        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user created from register", res.data);
          }
        });

        //update user profile
        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("after profile updated");
          })
          .catch((error) => console.log(error.message));
      });
      navigate(location?.state || "/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome to Our webSite`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mt-5">
        Welcome to <br /> <span className="text-secondary">scholarStream</span>
      </h2>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required.</p>
          )}

          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}
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
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 character</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have at least one UpperCase , one lowercase , one
              digit and one special character{" "}
            </p>
          )}
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link
            state={location?.state}
            to={"/login"}
            className="text-blue-600 underline"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
