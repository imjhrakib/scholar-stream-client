import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const modalRef = useRef();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`applications/${user?.email}`);
      return result.data;
    },
  });

  const handleDetails = (id) => {
    axiosSecure.get(`/application/${id}`).then((res) => {
      setSelectedApplication(res.data);
      document.getElementById("details_modal").showModal();
    });
  };

  const handleEdit = (id) => {
    axiosSecure.get(`/application/${id}`).then((res) => {
      setEditApp(res.data);
      modalRef.current.showModal();
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
        axiosSecure.delete(`applications/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
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

    const res = await axiosSecure.patch(
      `/applications/${editApp._id}`,
      updatedData
    );

    if (res.data.modifiedCount > 0) {
      refetch();
      setEditApp(null);
      modalRef.current.close();
    }
  };

  return (
    <div>
      <h2>My Applications :</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-center">SL No.</th>
              <th className="text-center">University Name</th>
              <th className="text-center">City</th>
              <th className="text-center">Feedback</th>
              <th className="text-center">Subject Category</th>
              <th className="text-center">Application Fees</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{application.universityName}</td>
                <td className="text-center">{application.city}</td>
                <td className="text-center">Feedback</td>
                <td className="text-center">{application.subjectCategory}</td>
                <td className="text-center">{application.applicationFees}</td>
                <td className="text-center">{application.status}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDetails(application._id)}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Details
                  </button>

                  {application.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleEdit(application._id)}
                        className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      {application.paymentStatus === "unpaid" && (
                        <button className="btn btn-sm bg-green-500 text-white hover:bg-green-600">
                          Pay
                        </button>
                      )}
                      <button
                        onClick={() => deleteScholarship(application._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {application.status === "completed" && (
                    <button className="btn btn-sm bg-purple-500 text-white hover:bg-purple-600">
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {selectedApplication && (
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th>SL No.</th>
                  <th>Scholarship Name</th>
                  <th>University Name</th>
                  <th>City</th>
                  <th>Subject Category</th>
                  <th>Application Fees</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{selectedApplication.scholarshipName}</td>
                  <td>{selectedApplication.universityName}</td>
                  <td>{selectedApplication.city}</td>
                  <td>{selectedApplication.subjectCategory}</td>
                  <td>${selectedApplication.applicationFees}</td>
                  <td>{selectedApplication.status}</td>
                  <td>{selectedApplication.paymentStatus}</td>
                  <td>
                    {new Date(selectedApplication.createdAt).toLocaleString(
                      "en-US",
                      { dateStyle: "medium", timeStyle: "short" }
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

      {/* Edit Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Update Application
          </h2>
          {editApp && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="label font-medium">Scholarship Name</label>
                <input
                  type="text"
                  {...register("scholarshipName")}
                  defaultValue={editApp.scholarshipName}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label font-medium">University Name</label>
                <input
                  type="text"
                  {...register("universityName")}
                  defaultValue={editApp.universityName}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label font-medium">City</label>
                <input
                  type="text"
                  {...register("city")}
                  defaultValue={editApp.city}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label font-medium">Application Fees</label>
                <input
                  type="number"
                  {...register("applicationFees")}
                  defaultValue={editApp.applicationFees}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action md:col-span-2">
                <button type="submit" className="btn btn-primary w-full">
                  Update Application
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
