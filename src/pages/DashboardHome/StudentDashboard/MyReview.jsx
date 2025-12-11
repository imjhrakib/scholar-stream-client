import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyReview = () => {
  const axiosSecure = useAxiosSecure();
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const modalRef = useRef();
  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews`);
      return result.data;
    },
  });
  const handleEditReview = async (id) => {
    const updatedReviews = {
      rating: star,
      comment: comment,
    };
    const review = await axiosSecure
      .patch(`/review/${id}/edit`, updatedReviews)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          setStar("");
          setComment("");
          setSelectedReview(null);
          document.getElementById("my_modal_5").close();
          Swal.fire("Review updated");
        }
      });
  };
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">My Reviews</h2>

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
                <td className="text-center text-slate-600">{review.comment}</td>

                <td className="text-center">
                  {new Date(review.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>

                <td className="text-center font-semibold text-blue-600">
                  ⭐ {review.rating}
                </td>

                <td className="flex justify-center gap-2 py-3">
                  <button
                    onClick={() => {
                      setSelectedReview(review._id);
                      setStar(review.rating);
                      setComment(review.comment);
                      document.getElementById("my_modal_5").showModal();
                    }}
                    className="btn btn-sm bg-amber-400 border-none text-black hover:bg-amber-500"
                  >
                    Edit
                  </button>
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

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-semibold mb-4">Add a Review</h2>

          {/* Star Rating */}
          <label className="block mb-2 font-medium">Rating</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 w-full mb-4 bg-white"
            value={star}
            onChange={(e) => setStar(e.target.value)}
          >
            <option value="">Select Rating</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐ 2</option>
            <option value="3">⭐ 3</option>
            <option value="4">⭐ 4</option>
            <option value="5">⭐ 5</option>
          </select>

          {/* Comment */}
          <label className="block mb-2 font-medium">Comment</label>
          <textarea
            placeholder="Share your thoughts..."
            className="textarea textarea-accent w-full h-24"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          {/* Buttons */}
          <div className="modal-action">
            {/* IMPORTANT: remove method='dialog' or it will auto-close */}
            <button
              className="btn btn-primary"
              onClick={() => handleEditReview(selectedReview)}
            >
              Submit
            </button>

            {/* Close Modal Button */}
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReview;
