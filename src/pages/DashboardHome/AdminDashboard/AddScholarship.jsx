import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Scholarship Data:", data);

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
        photoURL: data.photoURL,
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
      };
      axiosSecure.post("/scholarships", scholarshipInfo).then((res) => {
        if (res.data.insertedId) {
          console.log("scholarship created from register", res.data);
        }
      });
    });

    reset();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Add Scholarship
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Scholarship Name */}
        <div>
          <label className="label font-medium">Scholarship Name</label>
          <input
            type="text"
            {...register("scholarshipName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter scholarship name"
          />
          {errors.scholarshipName && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* University Name */}
        <div>
          <label className="label font-medium">University Name</label>
          <input
            type="text"
            {...register("universityName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter university name"
          />
        </div>

        <div className="flex flex-col">
          {/* Image */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required.</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="label font-medium">Country</label>
          <input
            type="text"
            {...register("country", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter country"
          />
        </div>

        {/* City */}
        <div>
          <label className="label font-medium">City</label>
          <input
            type="text"
            {...register("city", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter city"
          />
        </div>

        {/* World Rank */}
        <div>
          <label className="label font-medium">World Rank</label>
          <input
            type="number"
            {...register("worldRank")}
            className="input input-bordered w-full"
            placeholder="Enter world rank"
          />
        </div>

        {/* Subject Category */}
        <div>
          <label className="label font-medium">Subject Category</label>
          <input
            type="text"
            {...register("subjectCategory", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter subject category"
          />
        </div>

        {/* Scholarship Category */}
        <div>
          <label className="label font-medium">Scholarship Category</label>
          <input
            type="text"
            {...register("scholarshipCategory", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter scholarship category"
          />
        </div>

        {/* Degree */}
        <div>
          <label className="label font-medium">Degree</label>
          <input
            type="text"
            {...register("degree", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter degree"
          />
        </div>

        {/* Tuition Fees */}
        <div>
          <label className="label font-medium">
            Tuition Fees <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="number"
            {...register("tuitionFees")}
            className="input input-bordered w-full"
            placeholder="Enter tuition fees"
          />
        </div>

        {/* Application Fees */}
        <div>
          <label className="label font-medium">Application Fees</label>
          <input
            type="number"
            {...register("applicationFees", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter application fees"
          />
        </div>

        {/* Service Charge */}
        <div>
          <label className="label font-medium">Service Charge</label>
          <input
            type="number"
            {...register("serviceCharge", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter service charge"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="label font-medium">Deadline</label>
          <input
            type="date"
            {...register("deadline", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Post Date */}
        <div>
          <label className="label font-medium">Post Date</label>
          <input
            type="date"
            {...register("postDate", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* User Email */}
        <div className="md:col-span-2">
          <label className="label font-medium">User Email</label>
          <input
            type="email"
            {...register("userEmail", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter user email"
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <button className="btn btn-primary w-full">Add Scholarship</button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
