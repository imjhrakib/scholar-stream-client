import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Logo */}
        <img src={logo} alt="Scholar Stream" className="w-20 mx-auto mb-6" />

        {/* 403 Code */}
        <h1 className="text-6xl font-extrabold text-indigo-600">403</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Access Denied
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-3 text-sm">
          You don’t have permission to view this page on Scholar Stream. Please
          contact support if you think this is a mistake.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
