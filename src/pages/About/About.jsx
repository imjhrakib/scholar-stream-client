import React from "react";
import { FaGraduationCap, FaUniversity, FaUsers } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

const About = () => {
  const { theme, colors } = useTheme();

  const bgCard = colors[theme].bgCard;
  const bgSection = colors[theme].bg;
  const textPrimary = colors[theme].textPrimary;
  const textSecondary = colors[theme].textSecondary;

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-12 space-y-12"
      style={{ backgroundColor: bgSection }}
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold" style={{ color: textPrimary }}>
          About ScholarStream
        </h1>
        <p className="max-w-3xl mx-auto" style={{ color: textSecondary }}>
          ScholarStream is a modern scholarship management platform designed to
          connect students with global scholarship opportunities and simplify
          the application process.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div
          className="shadow-md rounded-xl p-6 space-y-3"
          style={{ backgroundColor: bgCard }}
        >
          <h2 className="text-2xl font-semibold" style={{ color: textPrimary }}>
            🎯 Our Mission
          </h2>
          <p style={{ color: textSecondary }}>
            Our mission is to make higher education accessible by providing a
            centralized platform where students can easily discover, apply, and
            track scholarship opportunities worldwide.
          </p>
        </div>

        <div
          className="shadow-md rounded-xl p-6 space-y-3"
          style={{ backgroundColor: bgCard }}
        >
          <h2 className="text-2xl font-semibold" style={{ color: textPrimary }}>
            🚀 Our Vision
          </h2>
          <p style={{ color: textSecondary }}>
            We envision a future where financial barriers do not limit academic
            potential, and every deserving student can pursue their dream
            education.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-6">
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: textPrimary }}
        >
          How ScholarStream Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="shadow-lg rounded-xl p-6 text-center space-y-3"
            style={{ backgroundColor: bgCard }}
          >
            <FaGraduationCap
              className="text-4xl mx-auto"
              style={{ color: colors[theme].primary }}
            />
            <h3
              className="text-xl font-semibold"
              style={{ color: textPrimary }}
            >
              For Students
            </h3>
            <p style={{ color: textSecondary }}>
              Browse scholarships, view details, apply online, make secure
              payments, and track application status from one dashboard.
            </p>
          </div>

          <div
            className="shadow-lg rounded-xl p-6 text-center space-y-3"
            style={{ backgroundColor: bgCard }}
          >
            <FaUniversity
              className="text-4xl mx-auto"
              style={{ color: colors[theme].primary }}
            />
            <h3
              className="text-xl font-semibold"
              style={{ color: textPrimary }}
            >
              For Universities
            </h3>
            <p style={{ color: textSecondary }}>
              Post scholarships, manage applications, review student profiles,
              and provide feedback efficiently.
            </p>
          </div>

          <div
            className="shadow-lg rounded-xl p-6 text-center space-y-3"
            style={{ backgroundColor: bgCard }}
          >
            <FaUsers
              className="text-4xl mx-auto"
              style={{ color: colors[theme].primary }}
            />
            <h3
              className="text-xl font-semibold"
              style={{ color: textPrimary }}
            >
              For Admins
            </h3>
            <p style={{ color: textSecondary }}>
              Manage users, control platform content, analyze statistics, and
              ensure smooth system operations.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose ScholarStream */}
      <div
        className="rounded-xl p-8 shadow-md space-y-6 max-w-4xl mx-auto"
        style={{ backgroundColor: bgCard }}
      >
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: textPrimary }}
        >
          Why Choose ScholarStream?
        </h2>
        <p
          className="text-center max-w-2xl mx-auto"
          style={{ color: textSecondary }}
        >
          ScholarStream is designed to simplify the scholarship process for
          students, universities, and admins. Here’s why it stands out:
        </p>
        <ul
          className="list-disc list-inside space-y-2 text-lg"
          style={{ color: textSecondary }}
        >
          <li>
            Centralized platform to discover, apply, and manage scholarships
            efficiently
          </li>
          <li>
            Secure authentication and payment system for safe transactions
          </li>
          <li>
            Role-based dashboards tailored for Students, Universities, and
            Admins
          </li>
          <li>Real-time application tracking and feedback system</li>
          <li>Modern, responsive, and user-friendly interface</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
