import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ManageScholarship = () => {
  const modalRef = useRef(null);
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const [selectedScholarship, setSelectedScholarship] = useState(null);

  // all scholarships
  const { refetch, data: scholarships = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const result = await axiosSecure.get("/scholarships");
      return result.data;
    },
  });

  const updateScholarship = async (id) => {
    // specific scholarship

    const result = await axiosSecure.get(`/scholarship/${id}`);
    setSelectedScholarship(result.data);
  };

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm();

  const onSubmit = async (data) => {
    let updatedData = {};

    // Only include changed fields
    for (const key in dirtyFields) {
      if (key === "photo") {
        const imageFile = data.photo[0];
        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);

          const image_API_URL = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host
          }`;

          const res = await axios.post(image_API_URL, formData);
          updatedData.photo = res.data.data.url;
        }
      } else {
        updatedData[key] = data[key];
      }
    }

    // Send only changed data
    const res = await axiosSecure
      .patch(`/scholarships/${selectedScholarship._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Scholarship updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          setSelectedScholarship(null);
          modalRef.current.close();
        }
      });
  };

  const deleteScholarship = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-gray-100">
              <th>SL No.</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {scholarships.map((scholarship, index) => (
              <tr key={scholarship._id}>
                <th>{index + 1}</th>
                <td>{scholarship.scholarshipName}</td>
                <td>{scholarship.universityName}</td>
                <td>{scholarship.applicationFees}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      updateScholarship(scholarship._id);
                      modalRef.current.showModal();
                    }}
                    className="btn btn-xs md:btn-sm btn-warning"
                  >
                    <FaEdit></FaEdit>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteScholarship(scholarship._id)}
                    className="btn btn-xs md:btn-sm btn-error"
                  >
                    <AiOutlineDelete></AiOutlineDelete>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_4" ref={modalRef} className="modal">        
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
              Update Scholarship
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
                  {...register("scholarshipName")}
                  defaultValue={selectedScholarship?.scholarshipName}
                  className="input input-bordered w-full"
                  placeholder="Enter scholarship name"
                />
                {/* {errors.scholarshipName && (
                <p className="text-red-500 text-sm">This field is required</p>
              )} */}
              </div>

              {/* University Name */}
              <div>
                <label className="label font-medium">University Name</label>
                <input
                  type="text"
                  {...register("universityName")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.universityName}
                  placeholder="Enter university name"
                />
              </div>

              <div className="flex flex-col">
                {/* Image */}
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo")}
                  className="file-input w-full"
                />
                {/* {errors.photo?.type === "required" && (
                <p className="text-red-500">Photo is required.</p>
              )} */}
              </div>

              {/* Country */}
              <div>
                <label className="label font-medium">Country</label>
                <input
                  type="text"
                  {...register("country")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.universityName}
                  placeholder="Enter country"
                />
              </div>

              {/* City */}
              <div>
                <label className="label font-medium">City</label>
                <input
                  type="text"
                  {...register("city")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.city}
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
                  defaultValue={selectedScholarship?.worldRank}
                  placeholder="Enter world rank"
                />
              </div>

              {/* Subject Category */}
              <div>
                <label className="label font-medium">Subject Category</label>
                <input
                  type="text"
                  {...register("subjectCategory")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.subjectCategory}
                  placeholder="Enter subject category"
                />
              </div>

              {/* Scholarship Category */}
              <div>
                <label className="label font-medium">
                  Scholarship Category
                </label>
                <input
                  type="text"
                  {...register("scholarshipCategory")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.scholarshipCategory}
                  placeholder="Enter scholarship category"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="label font-medium">Degree</label>
                <input
                  type="text"
                  {...register("degree")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.degree}
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
                  defaultValue={selectedScholarship?.tuitionFees}
                  placeholder="Enter tuition fees"
                />
              </div>

              {/* Application Fees */}
              <div>
                <label className="label font-medium">Application Fees</label>
                <input
                  type="number"
                  {...register("applicationFees")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.applicationFees}
                  placeholder="Enter application fees"
                />
              </div>

              {/* Service Charge */}
              <div>
                <label className="label font-medium">Service Charge</label>
                <input
                  type="number"
                  {...register("serviceCharge")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.serviceCharge}
                  placeholder="Enter service charge"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="label font-medium">Deadline</label>
                <input
                  type="date"
                  {...register("deadline")}
                  defaultValue={selectedScholarship?.deadline}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Post Date */}
              <div>
                <label className="label font-medium">Post Date</label>
                <input
                  type="date"
                  {...register("postDate")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.postDate}
                />
              </div>

              {/* User Email */}
              <div className="md:col-span-2">
                <label className="label font-medium">User Email</label>
                <input
                  type="email"
                  {...register("userEmail")}
                  className="input input-bordered w-full"
                  defaultValue={selectedScholarship?.userEmail}
                  placeholder="Enter user email"
                />
              </div>

              <div className="modal-action md:col-span-2 mt-4">
                <button className="btn btn-primary w-full">
                  Update Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ManageScholarship;
