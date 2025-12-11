import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [errorMsg, setErrorMsg] = useState("");
  const [scholarshipName, setScholarshipName] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!sessionId) return;

    // Optionally fetch session details from your backend if needed
    axiosSecure
      .get(`/payment-cancelled?session_id=${sessionId}`)
      .then((res) => {
        // Assuming your backend returns { scholarshipName, errorMessage }
        setScholarshipName(res.data.scholarshipName || "");
        setErrorMsg(res.data.errorMessage || "Payment was not completed.");
      })
      .catch((err) => {
        console.error("Payment cancel fetch failed:", err);
        setErrorMsg("Payment was not completed.");
      });
  }, [sessionId, axiosSecure]);

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-3">
        Payment Failed ❌
      </h1>

      <p className="text-gray-700 mb-6 text-lg">{errorMsg}</p>

      {scholarshipName && (
        <div className="text-left bg-gray-50 p-5 rounded-lg border mb-6">
          <h2 className="text-xl font-semibold mb-3">Scholarship Details</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Scholarship Name:</span>{" "}
            {scholarshipName}
          </p>
        </div>
      )}

      <Link
        to="/dashboard/my-application"
        className="px-6 py-3 inline-block bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default PaymentCancelled;
