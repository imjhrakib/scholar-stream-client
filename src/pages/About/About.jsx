import React from "react";
import { FaGraduationCap, FaUniversity, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-secondary">
          About ScholarStream
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          ScholarStream is a modern scholarship management platform designed to
          connect students with global scholarship opportunities and simplify
          the application process.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-base-100 shadow-md rounded-xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">
            🎯 Our Mission
          </h2>
          <p className="text-gray-600">
            Our mission is to make higher education accessible by providing a
            centralized platform where students can easily discover, apply, and
            track scholarship opportunities worldwide.
          </p>
        </div>

        <div className="bg-base-100 shadow-md rounded-xl p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-secondary">
            🚀 Our Vision
          </h2>
          <p className="text-gray-600">
            We envision a future where financial barriers do not limit academic
            potential, and every deserving student can pursue their dream
            education.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-secondary">
          How ScholarStream Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-base-100 shadow-lg rounded-xl p-6 text-center space-y-3">
            <FaGraduationCap className="text-4xl text-secondary mx-auto" />
            <h3 className="text-xl font-semibold">For Students</h3>
            <p className="text-gray-600">
              Browse scholarships, view details, apply online, make secure
              payments, and track application status from one dashboard.
            </p>
          </div>

          <div className="bg-base-100 shadow-lg rounded-xl p-6 text-center space-y-3">
            <FaUniversity className="text-4xl text-secondary mx-auto" />
            <h3 className="text-xl font-semibold">For Universities</h3>
            <p className="text-gray-600">
              Post scholarships, manage applications, review student profiles,
              and provide feedback efficiently.
            </p>
          </div>

          <div className="bg-base-100 shadow-lg rounded-xl p-6 text-center space-y-3">
            <FaUsers className="text-4xl text-secondary mx-auto" />
            <h3 className="text-xl font-semibold">For Admins</h3>
            <p className="text-gray-600">
              Manage users, control platform content, analyze statistics, and
              ensure smooth system operations.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose ScholarStream */}
      <div className="bg-base-200 rounded-xl p-8 space-y-4">
        <h2 className="text-3xl font-bold text-center text-secondary">
          Why Choose ScholarStream?
        </h2>
        <ul className="list-disc list-inside text-gray-700 max-w-3xl mx-auto space-y-2">
          <li>Centralized and easy-to-use scholarship platform</li>
          <li>Secure authentication and payment system</li>
          <li>Role-based dashboards for Students, Moderators, and Admins</li>
          <li>Real-time application tracking and feedback</li>
          <li>Modern, responsive, and recruiter-friendly UI</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
