import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState({
    transactionId: "",
    scholarshipName: "",
    universityName: "",
    applicationFees: 0,
  });

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        const data = res.data;

        setPaymentInfo({
          transactionId: data.transactionId,
          scholarshipName: data.scholarshipName,
          universityName: data.universityName,
          applicationFees: data.applicationFees,
        });
      })
      .catch((err) => {
        console.error("Payment success fetch failed:", err);
      });
  }, [sessionId, axiosSecure]);

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl text-center">
      {/* Success Message */}
      <h1 className="text-3xl font-bold text-green-600 mb-3">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-700 mb-6 text-lg">
        Thank you! Your payment has been processed successfully.
      </p>

      {/* Scholarship Details Card */}
      <div className="text-left bg-gray-50 p-5 rounded-lg border mb-6">
        <h2 className="text-xl font-semibold mb-3">Scholarship Details</h2>

        <p className="text-gray-700">
          <span className="font-semibold">Scholarship Name:</span>{" "}
          {paymentInfo.scholarshipName}
        </p>

        <p className="text-gray-700 mt-1">
          <span className="font-semibold">University:</span>{" "}
          {paymentInfo.universityName}
        </p>

        <p className="text-gray-700 mt-1">
          <span className="font-semibold">Amount Paid:</span> $
          {paymentInfo.applicationFees}
        </p>

        <p className="text-gray-700 mt-3">
          <span className="font-semibold">Transaction ID:</span>{" "}
          {paymentInfo.transactionId}
        </p>
      </div>

      {/* Button */}
      <Link
        to="/dashboard/my-application"
        className="px-6 py-3 inline-block bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to My Applications
      </Link>
    </div>
  );
};

export default PaymentSuccess;
