import React from "react";
import { useNavigate } from "react-router";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      {/* Illustration */}
      <div className="w-80 h-80 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 200"
          className="w-full h-full"
        >
          <rect width="300" height="200" rx="15" fill="#E0F7FA" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="72"
            fontWeight="bold"
            fill="#00ACC1"
          >
            404
          </text>
          <circle cx="230" cy="50" r="20" fill="#FF7043" />
          <circle cx="70" cy="150" r="15" fill="#FFCA28" />
          <path
            d="M40 100 Q60 60 100 80 Q140 100 160 40"
            stroke="#26A69A"
            strokeWidth="4"
            fill="transparent"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error404;
