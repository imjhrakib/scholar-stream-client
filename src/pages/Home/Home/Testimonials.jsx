import React from "react";
import useTheme from "../../../hooks/useTheme";

const testimonials = [
  {
    name: "Sarah K.",
    text: "Scholar Stream helped me get my dream scholarship!",
  },
  { name: "John D.", text: "Applying was so easy, highly recommended!" },
  {
    name: "Priya S.",
    text: "I got accepted to Oxford thanks to this platform.",
  },
];

const Testimonials = () => {
  const { theme, colors } = useTheme();

  const bgCard = theme === "dark" ? colors.dark.bgCard : colors.light.bgCard;
  const textPrimary =
    theme === "dark" ? colors.dark.textPrimary : colors.light.textPrimary;
  const textSecondary =
    theme === "dark" ? colors.dark.textSecondary : colors.light.textSecondary;
  const border = theme === "dark" ? colors.dark.border : colors.light.border;

  return (
    <div
      className="px-6 md:px-16 py-12 rounded-3xl"
      style={{
        backgroundColor: theme === "dark" ? colors.dark.bg : colors.light.bg,
      }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: textPrimary }}
      >
        What Students Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300"
            style={{
              backgroundColor: bgCard,
              color: textPrimary,
              border: `1px solid ${border}`,
            }}
          >
            <p style={{ color: textSecondary, marginBottom: "1rem" }}>
              "{t.text}"
            </p>
            <h4 style={{ color: textPrimary, fontWeight: "600" }}>{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
