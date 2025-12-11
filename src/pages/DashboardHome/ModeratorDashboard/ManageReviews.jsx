import React from "react";

const ManageReviews = () => {
  const reviews = [
    {
      _id: "676a01f5b8a12345cd001111",
      applicationId: "6769ff22b8a12345cd009999",
      userEmail: "student01@example.com",
      rating: 4.5,
      reviewComment:
        "The application process was smooth and the university responded quickly. Recommended!",
      scholarshipName: "Global Excellence Scholarship",
      universityName: "Berlin Institute of Technology",
      createdAt: "2025-01-02T10:20:30.000Z",
    },
    {
      _id: "676a0209b8a12345cd001112",
      applicationId: "6769ff22b8a12345cd009998",
      userEmail: "student02@example.com",
      rating: 3.8,
      reviewComment:
        "Good scholarship option but the documentation requirements were a bit heavy.",
      scholarshipName: "International Merit Scholarship",
      universityName: "University of Toronto",
      createdAt: "2025-01-03T14:45:12.000Z",
    },
  ];

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
                    {review.reviewComment}
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

                  <td className="flex justify-center gap-2 py-3">
                    <button className="btn btn-sm bg-amber-400 border-none text-black hover:bg-amber-500">
                      Edit
                    </button>
                    <button className="btn btn-sm bg-red-500 border-none text-white hover:bg-red-600">
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
