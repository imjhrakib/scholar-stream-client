import React from "react";
import useTheme from "../../../hooks/useTheme";

const deadlines = [
  { name: "Fulbright Scholarship", date: "2026-02-10" },
  { name: "Chevening Scholarship", date: "2026-03-01" },
  { name: "DAAD Scholarship", date: "2026-04-15" },
];

const UpcomingDeadlines = () => {
  const { theme, colors } = useTheme();

  return (
    <div
      className="px-6 md:px-16 py-12 rounded-3xl"
      style={{
        backgroundColor: theme === "dark" ? colors.dark.bg : colors.light.bg,
      }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{
          color:
            theme === "dark"
              ? colors.dark.textPrimary
              : colors.light.textPrimary,
        }}
      >
        Upcoming Deadlines
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deadlines.map((sch, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor:
                theme === "dark" ? colors.dark.bgCard : colors.light.bgCard,
              border: `1px solid ${
                theme === "dark" ? colors.dark.border : colors.light.border
              }`,
              color:
                theme === "dark"
                  ? colors.dark.textPrimary
                  : colors.light.textPrimary,
            }}
          >
            <h3 className="text-xl font-semibold">{sch.name}</h3>
            <p
              style={{
                color:
                  theme === "dark"
                    ? colors.dark.textSecondary
                    : colors.light.textSecondary,
                marginTop: "0.5rem",
              }}
            >
              Deadline: {sch.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
