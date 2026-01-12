import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useTheme from "../../../hooks/useTheme";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { theme, colors } = useTheme();

  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const result = await axiosSecure.get("/reviews");
      return result.data;
    },
  });

  const handleReviewDelete = async (id) => {
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
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div
      className="p-6"
      style={{
        color: colors[theme].textPrimary,
        backgroundColor: colors[theme].bgPrimary,
      }}
    >
      <h2 className="text-2xl font-semibold mb-4">Manage Reviews</h2>

      <div
        className="overflow-x-auto rounded-xl shadow-md border"
        style={{
          borderColor: colors[theme].border,
          backgroundColor: colors[theme].bgCard,
        }}
      >
        <table className="table w-full">
          <thead>
            <tr
              style={{
                backgroundColor: colors[theme].bgHeader,
                color: colors[theme].textPrimary,
              }}
            >
              <th className="text-center py-3">SL No.</th>
              <th className="text-center py-3">Scholarship Name</th>
              <th className="text-center py-3">University</th>
              <th className="text-center py-3">Comment</th>
              <th className="text-center py-3">Review Date</th>
              <th className="text-center py-3">Rating</th>
              <th className="text-center py-3">Actions</th>
            </tr>
          </thead>

          <tbody style={{ color: colors[theme].textPrimary }}>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td className="text-center py-3">{index + 1}</td>
                <td className="text-center font-medium">
                  {review.scholarshipName}
                </td>
                <td className="text-center">{review.universityName}</td>
                <td className="text-center">{review.comment}</td>
                <td className="text-center">
                  {new Date(review.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="text-center font-semibold text-blue-500">
                  ⭐ {review.rating}
                </td>
                <td className="text-center py-3">
                  <button
                    onClick={() => handleReviewDelete(review._id)}
                    style={{
                      backgroundColor: "#EF4444",
                      color: "#FFF",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReviews;
