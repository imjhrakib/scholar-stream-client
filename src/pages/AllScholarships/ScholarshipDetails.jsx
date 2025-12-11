import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../components/ui/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [scholarship, setScholarship] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure.get(`/scholarship/${id}`);
        setScholarship(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchScholarships();
  }, [axiosSecure]);

  if (!scholarship) return <Loading />;
  console.log(scholarship._id);
  const handleApplication = (application) => {
    application.userEmail = user?.email;
    application.displayName = user?.displayName;
    axiosSecure.post("/applications", application).then((res) => {
      if (res.data.insertedId) {
        navigate("/dashboard/my-application");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={scholarship.image}
          alt={scholarship.scholarshipName}
          className="w-full md:w-1/3 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">
            {scholarship.scholarshipName}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>University:</strong> {scholarship.universityName}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>City, Country:</strong> {scholarship.city},{" "}
            {scholarship.country}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>World Rank:</strong> {scholarship.worldRank}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Subject:</strong> {scholarship.subjectCategory}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Category:</strong> {scholarship.scholarshipCategory}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Degree:</strong> {scholarship.degree}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Tuition Fees:</strong> ${scholarship.tuitionFees}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Application Fees:</strong> ${scholarship.applicationFees}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Service Charge:</strong> ${scholarship.serviceCharge}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Deadline:</strong> {scholarship.deadline}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Posted on:</strong> {scholarship.postDate}
          </p>

          <button
            onClick={() => handleApplication(scholarship)}
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
