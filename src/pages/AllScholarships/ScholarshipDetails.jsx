import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../components/ui/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useTheme from "../../hooks/useTheme";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { theme, colors } = useTheme();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axios.get(`/scholarship/${id}`);
        setScholarship(res.data);
        const reviewRes = await axios.get(`/reviews/${id}/review`);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholarship();
  }, [axios, id]);

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
    <div
      className="max-w-6xl mx-auto p-6 mt-10 space-y-8"
      style={{
        backgroundColor: colors[theme].bgPage,
        color: colors[theme].textPrimary,
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={scholarship.photo}
          alt={scholarship.scholarshipName}
          className="w-full md:w-1/3 rounded-lg object-cover"
          style={{ border: `1px solid ${colors[theme].border}` }}
        />
        <div className="flex-1 space-y-2">
          <h1
            style={{ color: colors[theme].textPrimary }}
            className="text-4xl font-bold"
          >
            {scholarship.scholarshipName}
          </h1>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>University:</strong> {scholarship.universityName}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Location:</strong> {scholarship.city}, {scholarship.country}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>World Rank:</strong> {scholarship.worldRank}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Subject:</strong> {scholarship.subjectCategory}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Category:</strong> {scholarship.scholarshipCategory}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Degree:</strong> {scholarship.degree}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Tuition Fees:</strong> ${scholarship.tuitionFees}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Application Fees:</strong> ${scholarship.applicationFees}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Service Charge:</strong> ${scholarship.serviceCharge}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Deadline:</strong> {scholarship.deadline}
          </p>
          <p style={{ color: colors[theme].textSecondary }}>
            <strong>Posted on:</strong> {scholarship.postDate}
          </p>

          <button
            onClick={handleApplication}
            className="mt-4 px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor: colors[theme].primary,
              color: "#fff",
            }}
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Description */}
      <div
        className="p-6 rounded-xl shadow-inner"
        style={{
          backgroundColor: colors[theme].bgCard,
          color: colors[theme].textPrimary,
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Scholarship Description</h2>
        <p
          style={{ color: colors[theme].textSecondary, whiteSpace: "pre-line" }}
        >
          {scholarship.scholarshipDescription}
        </p>
      </div>

      {/* Reviews */}
      <div
        className="p-6 rounded-xl shadow-inner space-y-4"
        style={{
          backgroundColor: colors[theme].bgCard,
          color: colors[theme].textPrimary,
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 && (
          <p style={{ color: colors[theme].textSecondary }}>No reviews yet.</p>
        )}
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex gap-4 border-b pb-4"
            style={{ borderColor: colors[theme].border }}
          >
            <img
              src={review.photo}
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
              style={{ border: `1px solid ${colors[theme].border}` }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p
                  style={{ color: colors[theme].textPrimary, fontWeight: 600 }}
                >
                  {review.userName}
                </p>
                <div className="flex items-center">
                  {[...Array(Number(review.rating))].map((_, i) => (
                    <FaStar key={i} style={{ color: "#FACC15" }} />
                  ))}
                </div>
              </div>
              <p
                style={{
                  color: colors[theme].textSecondary,
                  fontSize: "0.85rem",
                }}
              >
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p style={{ color: colors[theme].textSecondary }}>
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
