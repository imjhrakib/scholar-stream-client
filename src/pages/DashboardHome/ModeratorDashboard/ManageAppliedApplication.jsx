import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AiOutlineEye,
  AiOutlineMessage,
  AiOutlineDelete,
} from "react-icons/ai";

const ManageAppliedApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/applications`);
      return result.data;
    },
  });

  const handleDetails = (id) => {
    axiosSecure.get(`/application/${id}/details`).then((res) => {
      setSelectedApplication(res.data);
      document.getElementById("details_modal").showModal();
    });
  };

  const handleFeedback = (id) => {
    axiosSecure
      .patch(`/application/${id}/feedback`, { feedback })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setSelectedApplication(null);
          setFeedback("");
          document.getElementById("my_modal_1").close();
          refetch();
          Swal.fire("Feedback has been sent been successfully");
        }
      });
  };

  const handleStatusUpdate = (id, status) => {
    axiosSecure.patch(`/application/${id}/status`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };
  const deleteApplication = (id) => {
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
        axiosSecure.delete(`/application/${id}/moderator`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Application removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Manage Applications
        </h2>

        <div className="overflow-x-auto rounded-xl shadow border border-slate-200 bg-white">
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-sm">
                <th className="text-center py-3">SL No.</th>
                <th className="text-center">Applicant Name</th>
                <th className="text-center">Applicant Email</th>
                <th className="text-center">Unviersity Name</th>
                <th className="text-center">Application Feedback</th>
                <th className="text-center">Application Status</th>
                <th className="text-center">Payments Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-slate-700">
              {applications.map((app, index) => (
                <tr key={app._id} className="hover:bg-slate-50 transition">
                  <td className="text-center py-3 font-medium">{index + 1}</td>
                  <td className="text-center">{app.displayName}</td>
                  <td className="text-center">{app.userEmail}</td>
                  <td className="text-center">{app.universityName}</td>
                  <td className="text-center text-slate-500">{app.feedback}</td>
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : app.status === "processing"
                          ? "bg-blue-200 text-blue-800"
                          : app.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : app.status === "rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        app.paymentStatus === "unpaid"
                          ? "bg-orange-200 text-orange-800"
                          : app.paymentStatus === "paid"
                          ? "bg-green-200 text-green-800"
                          : app.paymentStatus === "failed"
                          ? "bg-red-200 text-red-800"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {app.paymentStatus}
                    </span>
                  </td>

                  <td className="flex justify-center flex-wrap gap-2 py-2 items-center">
                    <button
                      onClick={() => handleDetails(app._id)}
                      className="flex items-center gap-1 btn btn-sm bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      <AiOutlineEye size={16} /> Details
                    </button>

                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="flex items-center gap-1 btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <AiOutlineMessage size={16} /> Feedback
                    </button>

                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm  bg-white hover:bg-gray-50 cursor-pointer"
                      value={app.status}
                      onChange={(e) =>
                        handleStatusUpdate(app._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>

                    {app.status === "pending" && (
                      <button
                        onClick={() => deleteApplication(app._id)}
                        className="flex items-center gap-1 btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        <AiOutlineDelete size={16} /> Reject
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

        {/* feedback modal */}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h2 className="text-xl font-semibold mb-2">Feedback</h2>
            <textarea
              placeholder="Send a Feedback"
              className="textarea textarea-accent w-full"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  onClick={() => handleFeedback(selectedApplication._id)}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ManageAppliedApplication;
