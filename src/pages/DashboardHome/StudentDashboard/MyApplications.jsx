import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useTheme from "../../../hooks/useTheme";

const MyApplications = () => {
  const { theme, colors } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const modalRef = useRef();
  const editModalRef = useRef();
  const [comment, setComment] = useState("");
  const [star, setStar] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`applications/${user?.email}`);
      return result.data;
    },
  });

  const handleDetails = (id) => {
    axiosSecure.get(`/application/${id}/details`).then((res) => {
      setSelectedApplication(res.data);
      document.getElementById("details_modal").showModal();
    });
  };

  const handleEdit = (id) => {
    axiosSecure.get(`/application/${id}`).then((res) => {
      setEditApp(res.data);
      editModalRef.current.showModal();
    });
  };

  const handlePay = async (application) => {
    const paymentInfo = {
      applicationId: application._id,
      applicationName: application.scholarshipName,
      deadline: application.deadline,
      cost: application.applicationFees || 0,
      userEmail: application.userEmail,
      universityName: application.universityName,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.href = res.data.url;
  };

  const handleReview = async (application) => {
    const reviews = {
      applicationId: application._id,
      scholarshipId: application.scholarshipId,
      scholarshipName: application.scholarshipName,
      photo: user?.photoURL,
      universityName: application.universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      rating: star,
      comment: comment,
    };
    const review = await axiosSecure
      .post(`/reviews/${application._id}`, reviews)
      .then((res) => {
        if (res.data.insertedId) {
          refetch();
          modalRef.current.close();
          Swal.fire("Review added");
        }
        if (res.data.message) {
          modalRef.current.close();
          Swal.fire("Review already Exist");
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
        axiosSecure.delete(`/application/${id}/student`).then((res) => {
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
    for (const key in dirtyFields) updatedData[key] = data[key];

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
    <div
      className="p-6"
      style={{
        backgroundColor: colors[theme].bg,
        color: colors[theme].textPrimary,
      }}
    >
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: colors[theme].textPrimary }}
      >
        My Applications
      </h2>

      <div
        className="overflow-x-auto rounded-xl shadow border"
        style={{
          borderColor: colors[theme].border,
          backgroundColor: colors[theme].bgCard,
          color: colors[theme].textPrimary,
        }}
      >
        <table className="table w-full">
          <thead>
            <tr
              style={{
                backgroundColor: colors[theme].bgTableHeader,
                color: colors[theme].textPrimary,
              }}
            >
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
          <tbody style={{ color: colors[theme].textPrimary }}>
            {applications.map((app, index) => (
              <tr
                key={app._id}
                className="hover:opacity-80 transition"
                style={{ backgroundColor: colors[theme].bgCard }}
              >
                <td className="text-center py-3 font-medium">{index + 1}</td>
                <td className="text-center">{app.universityName}</td>
                <td className="text-center">{app.city}</td>
                <td className="text-center text-slate-500">{app.feedback}</td>
                <td className="text-center">{app.subjectCategory}</td>
                <td className="text-center">${app.applicationFees}</td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold`}
                    style={{
                      backgroundColor:
                        app.status === "pending"
                          ? colors[theme].warningBg
                          : app.status === "completed"
                          ? colors[theme].successBg
                          : colors[theme].bgCard,
                      color:
                        app.status === "pending"
                          ? colors[theme].warning
                          : app.status === "completed"
                          ? colors[theme].success
                          : colors[theme].textPrimary,
                    }}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="flex justify-center flex-wrap gap-2 py-2">
                  <button
                    onClick={() => handleDetails(app._id)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: colors[theme].primary,
                      color: colors[theme].textOnPrimary,
                    }}
                  >
                    Details
                  </button>

                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleEdit(app._id)}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: colors[theme].warning,
                          color: colors[theme].textOnWarning,
                        }}
                      >
                        Edit
                      </button>

                      {app.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePay(app)}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: colors[theme].success,
                            color: colors[theme].textOnSuccess,
                          }}
                        >
                          Pay
                        </button>
                      )}

                      <button
                        onClick={() => deleteApplication(app._id)}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: colors[theme].danger,
                          color: colors[theme].textOnDanger,
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {app.status === "completed" && (
                    <button
                      onClick={() => {
                        document.getElementById("my_modal_5").showModal();
                        setSelectedApplication(app);
                      }}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: colors[theme].info,
                        color: colors[theme].textOnInfo,
                      }}
                    >
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
      <dialog
        id="details_modal"
        className="modal"
        style={{
          color: theme === "dark" ? "#F9FAFB" : "#1F2937", // light text in dark mode, dark text in light mode
          backgroundColor: theme === "dark" ? "#1F2937" : "#FFFFFF", // dark bg for dark mode, white for light
          borderColor: theme === "dark" ? "#374151" : "#E5E7EB", // subtle border based on theme
        }}
      >
        <div
          className="modal-box max-w-4xl"
          style={{ backgroundColor: "inherit", color: "inherit" }}
        >
          {selectedApplication && (
            <div className="space-y-3">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: theme === "dark" ? "#F9FAFB" : "#1F2937" }}
              >
                Application Details
              </h3>

              <table className="table w-full">
                <tbody>
                  {Object.entries(selectedApplication).map(([key, value]) => (
                    <tr key={key}>
                      <td
                        className="font-semibold"
                        style={{
                          color: theme === "dark" ? "#E5E7EB" : "#374151",
                        }}
                      >
                        {key}
                      </td>
                      <td
                        style={{
                          color: theme === "dark" ? "#D1D5DB" : "#1F2937",
                        }}
                      >
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
          <button>Close</button>
        </form>
      </dialog>

      {/* EDIT MODAL */}
      <dialog
        ref={editModalRef}
        className="modal"
        style={{
          color: colors[theme].textPrimary,
          backgroundColor: colors[theme].bgCard,
        }}
      >
        <div className="modal-box max-w-4xl">
          <h2 className="text-xl font-semibold text-center mb-4">
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
                  style={{
                    backgroundColor: colors[theme].bg,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
              </div>

              <div>
                <label className="label font-medium">University</label>
                <input
                  type="text"
                  {...register("universityName")}
                  defaultValue={editApp.universityName}
                  className="input input-bordered w-full"
                  style={{
                    backgroundColor: colors[theme].bg,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
              </div>

              <div>
                <label className="label font-medium">City</label>
                <input
                  type="text"
                  {...register("city")}
                  defaultValue={editApp.city}
                  className="input input-bordered w-full"
                  style={{
                    backgroundColor: colors[theme].bg,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
              </div>

              <div>
                <label className="label font-medium">Application Fees</label>
                <input
                  type="number"
                  {...register("applicationFees")}
                  defaultValue={editApp.applicationFees}
                  className="input input-bordered w-full"
                  style={{
                    backgroundColor: colors[theme].bg,
                    color: colors[theme].textPrimary,
                    borderColor: colors[theme].border,
                  }}
                />
              </div>

              <div className="modal-action md:col-span-2">
                <button
                  type="submit"
                  className="btn w-full"
                  style={{
                    backgroundColor: colors[theme].primary,
                    color: colors[theme].textOnPrimary,
                  }}
                >
                  Update Application
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* ADD REVIEW MODAL */}
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal"
        style={{
          color: colors[theme].textPrimary,
          backgroundColor: colors[theme].bgCard,
        }}
      >
        <div className="modal-box">
          <h2 className="text-xl font-semibold mb-4">Add a Review</h2>

          <label className="block mb-2 font-medium">Rating</label>
          <select
            className="border rounded px-3 py-2 w-full mb-4"
            value={star}
            onChange={(e) => setStar(e.target.value)}
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>{`⭐ ${s}`}</option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Comment</label>
          <textarea
            placeholder="Share your thoughts..."
            className="textarea w-full h-24 mb-4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          ></textarea>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => handleReview(selectedApplication)}
              style={{
                backgroundColor: colors[theme].primary,
                color: colors[theme].textOnPrimary,
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
