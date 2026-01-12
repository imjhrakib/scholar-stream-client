import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme"; // added

const ManageScholarship = () => {
  const { theme, colors } = useTheme(); // added
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
      <div
        className="overflow-x-auto"
        style={{ backgroundColor: colors[theme].bg }}
      >
        <table className="table table-zebra w-full">
          <thead
            style={{
              backgroundColor: colors[theme].bgCard,
              color: colors[theme].textPrimary,
            }}
          >
            <tr>
              <th>SL No.</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship, index) => (
              <tr
                key={scholarship._id}
                style={{
                  backgroundColor: colors[theme].bgCard,
                  color: colors[theme].textPrimary,
                }}
              >
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
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteScholarship(scholarship._id)}
                    className="btn btn-xs md:btn-sm btn-error"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="my_modal_4" ref={modalRef} className="modal">
        <div
          className="modal-box w-11/12 max-w-5xl"
          style={{
            backgroundColor: colors[theme].bgCard,
            color: colors[theme].textPrimary,
          }}
        >
          <div className="max-w-4xl mx-auto p-6 rounded-lg shadow">
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors[theme].primary }}
            >
              Update Scholarship
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
                  {...register("scholarshipName")}
                  defaultValue={selectedScholarship?.scholarshipName}
                  className="input input-bordered w-full"
                  placeholder="Enter scholarship name"
                  style={{
                    backgroundColor: colors[theme].bg,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
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
                  {...register("universityName")}
                  defaultValue={selectedScholarship?.universityName}
                  className="input input-bordered w-full"
                  placeholder="Enter university name"
                  style={{
                    backgroundColor: colors[theme].bg,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
              </div>

              {/* Photo */}
              <div className="flex flex-col">
                <label
                  className="label"
                  style={{ color: colors[theme].textPrimary }}
                >
                  Photo
                </label>
                <input
                  type="file"
                  {...register("photo")}
                  className="file-input w-full"
                />
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
                  {...register("country")}
                  defaultValue={selectedScholarship?.country}
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
                  {...register("city")}
                  defaultValue={selectedScholarship?.city}
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
                  defaultValue={selectedScholarship?.worldRank}
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
                  {...register("subjectCategory")}
                  defaultValue={selectedScholarship?.subjectCategory}
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
                  {...register("scholarshipCategory")}
                  defaultValue={selectedScholarship?.scholarshipCategory}
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
                  {...register("degree")}
                  defaultValue={selectedScholarship?.degree}
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
                  defaultValue={selectedScholarship?.tuitionFees}
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
                  {...register("applicationFees")}
                  defaultValue={selectedScholarship?.applicationFees}
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
                  {...register("serviceCharge")}
                  defaultValue={selectedScholarship?.serviceCharge}
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
                  {...register("deadline")}
                  defaultValue={selectedScholarship?.deadline}
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
                  {...register("postDate")}
                  defaultValue={selectedScholarship?.postDate}
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
                  {...register("userEmail")}
                  defaultValue={selectedScholarship?.userEmail}
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
                  {...register("description")}
                  defaultValue={selectedScholarship?.scholarshipDescription}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter description"
                  rows={4}
                  style={{
                    backgroundColor: colors[theme].bg,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
              </div>

              <div className="modal-action md:col-span-2 mt-4">
                <button
                  className="btn btn-primary w-full"
                  style={{
                    backgroundColor: colors[theme].primary,
                    color: "#fff",
                    borderColor: colors[theme].primaryHover,
                  }}
                >
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
