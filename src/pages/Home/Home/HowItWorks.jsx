import React from "react";
import { FaSearch, FaFileAlt, FaGraduationCap } from "react-icons/fa";
import useTheme from "../../../hooks/useTheme";

const steps = [
  {
    icon: <FaSearch />,
    title: "Search Scholarships",
    desc: "Find scholarships matching your profile.",
    color: "primary",
  },
  {
    icon: <FaFileAlt />,
    title: "Apply Easily",
    desc: "Submit applications online with ease.",
    color: "accent",
  },
  {
    icon: <FaGraduationCap />,
    title: "Get Accepted",
    desc: "Start your dream study abroad journey.",
    color: "primaryHover",
  },
];

const HowItWorks = () => {
  const { theme, colors } = useTheme();

  return (
    <section
      className="px-6 md:px-16 py-12 rounded-3xl"
      style={{
        backgroundColor: theme === "dark" ? colors.dark.bg : colors.light.bg,
      }}
    >
      <h2
        className="text-3xl font-bold mb-10 text-center"
        style={{
          color:
            theme === "dark"
              ? colors.dark.textPrimary
              : colors.light.textPrimary,
        }}
      >
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            style={{
              backgroundColor:
                theme === "dark" ? colors.dark.bgCard : colors.light.bgCard,
              color:
                theme === "dark"
                  ? colors.dark.textPrimary
                  : colors.light.textPrimary,
              border: `1px solid ${
                theme === "dark" ? colors.dark.border : colors.light.border
              }`,
            }}
          >
            <div
              className="text-4xl mb-4 inline-flex justify-center items-center rounded-full p-4"
              style={{
                color:
                  theme === "dark"
                    ? colors.dark[step.color]
                    : colors.light[step.color],
                backgroundColor:
                  theme === "dark"
                    ? colors.dark.border + "33"
                    : colors.light.border + "33",
              }}
            >
              {step.icon}
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                color:
                  theme === "dark"
                    ? colors.dark.textPrimary
                    : colors.light.textPrimary,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                color:
                  theme === "dark"
                    ? colors.dark.textSecondary
                    : colors.light.textSecondary,
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
