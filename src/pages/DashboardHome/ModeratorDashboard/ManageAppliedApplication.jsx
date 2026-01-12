import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import {
  AiOutlineEye,
  AiOutlineMessage,
  AiOutlineDelete,
} from "react-icons/ai";
import useTheme from "../../../hooks/useTheme";
import { color } from "framer-motion";

const ManageAppliedApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { theme, colors } = useTheme();

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
          Swal.fire("Feedback has been sent successfully");
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
    <div style={{ color: colors[theme].textPrimary }}>
      <div className="p-6">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: colors[theme].textPrimary }}
        >
          Manage Applications
        </h2>

        <div
          className="overflow-x-auto rounded-xl shadow border"
          style={{
            backgroundColor: colors[theme].bgCard,
            borderColor: colors[theme].border,
          }}
        >
          <table className="table w-full">
            <thead>
              <tr
                style={{
                  backgroundColor: colors[theme].bgTableHeader,
                  color: colors[theme].textPrimary,
                }}
                className="text-sm"
              >
                <th className="text-center py-3">SL No.</th>
                <th className="text-center">Applicant Name</th>
                <th className="text-center">Applicant Email</th>
                <th className="text-center">University Name</th>
                <th className="text-center">Application Feedback</th>
                <th className="text-center">Application Status</th>
                <th className="text-center">Payments Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody style={{ color: colors[theme].textPrimary }}>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td className="text-center py-3 font-medium">{index + 1}</td>
                  <td className="text-center">{app.displayName}</td>
                  <td className="text-center">{app.userEmail}</td>
                  <td className="text-center">{app.universityName}</td>
                  <td
                    className="text-center"
                    style={{ color: colors[theme].textSecondary }}
                  >
                    {app.feedback}
                  </td>
                  <td className="text-center">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor:
                          app.status === "pending"
                            ? "#fef3c7"
                            : app.status === "processing"
                            ? "#bfdbfe"
                            : app.status === "completed"
                            ? "#d1fae5"
                            : app.status === "rejected"
                            ? "#fecaca"
                            : "#e5e7eb",
                        color:
                          app.status === "pending"
                            ? "#b45309"
                            : app.status === "processing"
                            ? "#1d4ed8"
                            : app.status === "completed"
                            ? "#065f46"
                            : app.status === "rejected"
                            ? "#991b1b"
                            : "#1f2937",
                      }}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor:
                          app.paymentStatus === "unpaid"
                            ? "#fed7aa"
                            : app.paymentStatus === "paid"
                            ? "#d1fae5"
                            : app.paymentStatus === "failed"
                            ? "#fecaca"
                            : "#e5e7eb",
                        color:
                          app.paymentStatus === "unpaid"
                            ? "#c2410c"
                            : app.paymentStatus === "paid"
                            ? "#065f46"
                            : app.paymentStatus === "failed"
                            ? "#991b1b"
                            : "#1f2937",
                      }}
                    >
                      {app.paymentStatus}
                    </span>
                  </td>

                  <td className="flex justify-center flex-wrap gap-2 py-2 items-center">
                    <button
                      onClick={() => handleDetails(app._id)}
                      className="flex items-center gap-1 btn btn-sm"
                      style={{ backgroundColor: "#4f46e5", color: "#fff" }}
                    >
                      <AiOutlineEye size={16} /> Details
                    </button>

                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="flex items-center gap-1 btn btn-sm"
                      style={{ backgroundColor: "#3b82f6", color: "#fff" }}
                    >
                      <AiOutlineMessage size={16} /> Feedback
                    </button>

                    <select
                      className="border rounded px-2 py-1 text-sm cursor-pointer"
                      style={{
                        backgroundColor: colors[theme].bgCard,
                        color: colors[theme].textPrimary,
                        borderColor: colors[theme].border,
                      }}
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
                        className="flex items-center gap-1 btn btn-sm"
                        style={{ backgroundColor: "#ef4444", color: "#fff" }}
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
        <dialog
          id="details_modal"
          className="modal"
          style={{
            color: theme === "dark" ? "#F9FAFB" : "#1F2937",
            backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF",
            borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
          }}
        >
          <div
            className="modal-box max-w-4xl"
            style={{
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
              backgroundColor: colors[theme].bgCard,
            }}
          >
            {selectedApplication && (
              <div className="space-y-3">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: colors[theme].textPrimary }}
                >
                  Application Details
                </h3>

                <table className="table w-full">
                  <tbody>
                    {Object.entries(selectedApplication).map(([key, value]) => (
                      <tr key={key}>
                        <td
                          className="font-semibold"
                          style={{ color: colors[theme].textPrimary }}
                        >
                          {key}
                        </td>
                        <td style={{ color: colors[theme].textPrimary }}>
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <form method="dialog" className="modal-backdrop">
            <button style={{ color: colors[theme].textPrimary }}>Close</button>
          </form>
        </dialog>

        {/* FEEDBACK MODAL */}
        <dialog
          id="my_modal_1"
          className="modal"
          style={{
            color: colors[theme].textPrimary,
            backgroundColor: colors[theme].bg,
          }}
        >
          <div
            className="modal-box"
            style={{
              color: colors[theme].textPrimary,
              backgroundColor: colors[theme].bgCard,
            }}
          >
            <h2 className="text-xl font-semibold mb-2">Feedback</h2>
            <textarea
              placeholder="Send a Feedback"
              className="textarea w-full"
              style={{
                backgroundColor: colors[theme].bgCard,
                color: colors[theme].textPrimary,
                borderColor: colors[theme].border,
              }}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <form method="dialog">
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
