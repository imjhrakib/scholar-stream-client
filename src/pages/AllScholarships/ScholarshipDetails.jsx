import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../components/ui/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const ScholarshipDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useAuth();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axiosSecure.get(`/scholarship/${id}`);
        setScholarship(res.data);
        // Fetch reviews for this scholarship
        const reviewRes = await axiosSecure.get(`/reviews/${id}/review`);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholarship();
  }, [axiosSecure, id]);

  if (!scholarship) return <Loading />;

  const handleApplication = () => {
    const application = {
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      subjectCategory: scholarship.subjectCategory,
      applicationFees: scholarship.applicationFees,
      city: scholarship.city,
      userEmail: user?.email,
      displayName: user?.displayName,
    };
    axiosSecure.post("/application", application).then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Pay for Confirmation");
        navigate("/dashboard/my-application");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={scholarship.photo}
          alt={scholarship.scholarshipName}
          className="w-full md:w-1/3 rounded-lg object-cover"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            {scholarship.scholarshipName}
          </h1>
          <p className="text-gray-600">
            <strong>University:</strong> {scholarship.universityName}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {scholarship.city}, {scholarship.country}
          </p>
          <p className="text-gray-600">
            <strong>World Rank:</strong> {scholarship.worldRank}
          </p>
          <p className="text-gray-600">
            <strong>Subject:</strong> {scholarship.subjectCategory}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {scholarship.scholarshipCategory}
          </p>
          <p className="text-gray-600">
            <strong>Degree:</strong> {scholarship.degree}
          </p>
          <p className="text-gray-600">
            <strong>Tuition Fees:</strong> ${scholarship.tuitionFees}
          </p>
          <p className="text-gray-600">
            <strong>Application Fees:</strong> ${scholarship.applicationFees}
          </p>
          <p className="text-gray-600">
            <strong>Service Charge:</strong> ${scholarship.serviceCharge}
          </p>
          <p className="text-gray-600">
            <strong>Deadline:</strong> {scholarship.deadline}
          </p>
          <p className="text-gray-600">
            <strong>Posted on:</strong> {scholarship.postDate}
          </p>

          <button
            onClick={handleApplication}
            className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
        <h2 className="text-2xl font-bold mb-4">Scholarship Description</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {scholarship.scholarshipDescription}
        </p>
      </div>

      {/* Reviews */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner space-y-4">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex gap-4 border-b border-gray-200 pb-4"
          >
            <img
              src={review.photo}
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">{review.userName}</p>
                <div className="flex items-center">
                  {[...Array(Number(review.rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
