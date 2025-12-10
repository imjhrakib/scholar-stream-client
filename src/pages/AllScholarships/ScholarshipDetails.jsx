import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/ui/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarships, setScholarships] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure.get(`/scholarship/${id}`);
        setScholarships(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchScholarships();
  }, [axiosSecure]);

  if (!scholarships) return <Loading></Loading>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={scholarships.image}
          alt={scholarships.scholarshipName}
          className="w-full md:w-1/3 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3">
            {scholarships.scholarshipName}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>University:</strong> {scholarships.universityName}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>City, Country:</strong> {scholarships.city},{" "}
            {scholarships.country}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>World Rank:</strong> {scholarships.worldRank}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Subject:</strong> {scholarships.subjectCategory}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Category:</strong> {scholarships.scholarshipCategory}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Degree:</strong> {scholarships.degree}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Tuition Fees:</strong> ${scholarships.tuitionFees}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Application Fees:</strong> ${scholarships.applicationFees}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Service Charge:</strong> ${scholarships.serviceCharge}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Deadline:</strong> {scholarships.deadline}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Posted on:</strong> {scholarships.postDate}
          </p>

          <a
            href="#apply"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
