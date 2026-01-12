import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useTheme from "../../../hooks/useTheme";

const AddScholarship = () => {
  const { theme, colors } = useTheme();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const scholarshipImg = data.photo[0];

    // store the image and get the photo url
    const formData = new FormData();
    formData.append("image", scholarshipImg);
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host
    }`;

    axios.post(image_API_URL, formData).then((res) => {
      const photoURL = res.data.data.url;
      //create user in the database
      const scholarshipInfo = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        photo: photoURL,
        country: data.country,
        city: data.city,
        worldRank: data.worldRank,
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: data.tuitionFees,
        applicationFees: data.applicationFees,
        serviceCharge: data.serviceCharge,
        deadline: data.deadline,
        postDate: data.postDate,
        instituteEmail: data.userEmail,
        scholarshipDescription: data.description,
      };
      axiosSecure.post("/scholarships", scholarshipInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Scholarship added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      });
    });
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 rounded-lg shadow"
      style={{
        backgroundColor: colors[theme].bgCard,
        color: colors[theme].textPrimary,
      }}
    >
      <h2
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: colors[theme].primary }}
      >
        Add Scholarship
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Scholarship Name */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Scholarship Name
          </label>
          <input
            type="text"
            {...register("scholarshipName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter scholarship name"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
          {errors.scholarshipName && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* University Name */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            University Name
          </label>
          <input
            type="text"
            {...register("universityName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter university name"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="label" style={{ color: colors[theme].textPrimary }}>
            Photo
          </label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required.</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Country
          </label>
          <input
            type="text"
            {...register("country", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter country"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* City */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            City
          </label>
          <input
            type="text"
            {...register("city", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter city"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* World Rank */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            World Rank
          </label>
          <input
            type="number"
            {...register("worldRank")}
            className="input input-bordered w-full"
            placeholder="Enter world rank"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Subject Category */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Subject Category
          </label>
          <input
            type="text"
            {...register("subjectCategory", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter subject category"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Scholarship Category */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Scholarship Category
          </label>
          <input
            type="text"
            {...register("scholarshipCategory", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter scholarship category"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Degree */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Degree
          </label>
          <input
            type="text"
            {...register("degree", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter degree"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Tuition Fees */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Tuition Fees <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="number"
            {...register("tuitionFees")}
            className="input input-bordered w-full"
            placeholder="Enter tuition fees"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Application Fees */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Application Fees
          </label>
          <input
            type="number"
            {...register("applicationFees", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter application fees"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Service Charge */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Service Charge
          </label>
          <input
            type="number"
            {...register("serviceCharge", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter service charge"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Deadline */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Deadline
          </label>
          <input
            type="date"
            {...register("deadline", { required: true })}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Post Date */}
        <div>
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Post Date
          </label>
          <input
            type="date"
            {...register("postDate", { required: true })}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* User Email */}
        <div className="md:col-span-2">
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            User Email
          </label>
          <input
            type="email"
            {...register("userEmail", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter user email"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            className="label font-medium"
            style={{ color: colors[theme].textPrimary }}
          >
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Enter description"
            rows={4}
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            className="btn w-full"
            style={{
              backgroundColor: colors[theme].primary,
              color: "#fff",
              borderColor: colors[theme].primaryHover,
            }}
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
