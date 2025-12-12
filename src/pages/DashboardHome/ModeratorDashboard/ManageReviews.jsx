import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

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
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Manage Reviews
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-md border border-slate-200">
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-sm">
                <th className="text-center py-3">SL No.</th>
                <th className="text-center py-3">Scholarship Name</th>
                <th className="text-center py-3">University</th>
                <th className="text-center py-3">Comment</th>
                <th className="text-center py-3">Review Date</th>
                <th className="text-center py-3">Rating</th>
                <th className="text-center py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="text-slate-700 text-sm">
              {reviews.map((review, index) => (
                <tr key={review._id} className="hover:bg-slate-50 transition">
                  <td className="text-center py-3">{index + 1}</td>
                  <td className="text-center font-medium">
                    {review.scholarshipName}
                  </td>
                  <td className="text-center">{review.universityName}</td>
                  <td className="text-center text-slate-600">
                    {review.comment}
                  </td>

                  <td className="text-center">
                    {new Date(review.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>

                  <td className="text-center font-semibold text-blue-600">
                    ⭐ {review.rating}
                  </td>

                  <td className="text-center py-3">
                    <button
                      onClick={() => handleReviewDelete(review._id)}
                      className="btn btn-sm bg-red-500 border-none text-white hover:bg-red-600"
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
    </div>
  );
};

export default ManageReviews;
