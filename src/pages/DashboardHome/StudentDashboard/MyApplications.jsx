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
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`applications/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Application removed.", "success");
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
      updatedData[key] = data[key];
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        My Applications
      </h2>

      <div className="overflow-x-auto rounded-xl shadow border border-slate-200 bg-white">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-sm">
              <th className="text-center py-3">SL</th>
              <th className="text-center">University</th>
              <th className="text-center">City</th>
              <th className="text-center">Feedback</th>
              <th className="text-center">Subject</th>
              <th className="text-center">Fees</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {applications.map((app, index) => (
              <tr key={app._id} className="hover:bg-slate-50 transition">
                <td className="text-center py-3 font-medium">{index + 1}</td>
                <td className="text-center">{app.universityName}</td>
                <td className="text-center">{app.city}</td>
                <td className="text-center text-slate-500">Feedback</td>
                <td className="text-center">{app.subjectCategory}</td>
                <td className="text-center">${app.applicationFees}</td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="flex justify-center flex-wrap gap-2 py-2">
                  <button
                    onClick={() => handleDetails(app._id)}
                    className="btn btn-sm bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    Details
                  </button>

                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleEdit(app._id)}
                        className="btn btn-sm bg-amber-400 hover:bg-amber-500 text-black"
                      >
                        Edit
                      </button>

                      {app.paymentStatus === "unpaid" && (
                        <button className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600">
                          Pay
                        </button>
                      )}

                      <button
                        onClick={() => deleteScholarship(app._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {app.status === "completed" && (
                    <button className="btn btn-sm bg-purple-500 hover:bg-purple-600 text-white">
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-4xl">
          {selectedApplication && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Application Details
              </h3>

              <table className="table w-full">
                <tbody className="text-slate-700">
                  <tr>
                    <td className="font-semibold">Scholarship</td>
                    <td>{selectedApplication.scholarshipName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">University</td>
                    <td>{selectedApplication.universityName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">City</td>
                    <td>{selectedApplication.city}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Subject</td>
                    <td>{selectedApplication.subjectCategory}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Application Fees</td>
                    <td>${selectedApplication.applicationFees}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Status</td>
                    <td>{selectedApplication.status}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Payment</td>
                    <td>{selectedApplication.paymentStatus}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Created At</td>
                    <td>
                      {new Date(selectedApplication.createdAt).toLocaleString(
                        "en-US",
                        { dateStyle: "medium", timeStyle: "short" }
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

      {/* EDIT MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-4xl">
          <h2 className="text-xl font-semibold text-center mb-4 text-slate-800">
            Edit Application
          </h2>

          {editApp && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div>
                <label className="label font-medium">Scholarship</label>
                <input
                  type="text"
                  {...register("scholarshipName")}
                  defaultValue={editApp.scholarshipName}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label font-medium">University</label>
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
