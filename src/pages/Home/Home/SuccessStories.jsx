import React from "react";
import { motion } from "framer-motion";
import useTheme from "../../../hooks/useTheme";

const SuccessStories = () => {
  const { theme, colors } = useTheme();

  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Software Engineering Student",
      text: "I got my dream scholarship through this platform. It was simple and fast!",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Mark Williams",
      role: "Business Student",
      text: "Scholar Stream helped me find multiple scholarships I didn’t know existed.",
      image: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      name: "Sophia Lee",
      role: "Medical Student",
      text: "The platform is very user-friendly and I found a perfect scholarship for my needs.",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      name: "James Brown",
      role: "Arts Student",
      text: "Thanks to Scholar Stream, I could apply for several scholarships quickly and easily.",
      image: "https://randomuser.me/api/portraits/men/27.jpg",
    },
  ];

  return (
    <section
      className="py-20"
      style={{
        backgroundColor: theme === "dark" ? colors.dark.bg : colors.light.bg,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            color:
              theme === "dark"
                ? colors.dark.textPrimary
                : colors.light.textPrimary,
          }}
        >
          Success Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
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
              <p
                style={{
                  color:
                    theme === "dark"
                      ? colors.dark.textSecondary
                      : colors.light.textSecondary,
                  marginBottom: "1rem",
                }}
              >
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full"
                  style={{
                    border: `1px solid ${
                      theme === "dark"
                        ? colors.dark.border
                        : colors.light.border
                    }`,
                  }}
                />
                <div className="text-left">
                  <h4
                    style={{
                      color:
                        theme === "dark"
                          ? colors.dark.textPrimary
                          : colors.light.textPrimary,
                      fontWeight: "bold",
                    }}
                  >
                    {t.name}
                  </h4>
                  <p
                    style={{
                      color:
                        theme === "dark"
                          ? colors.dark.textSecondary
                          : colors.light.textSecondary,
                      fontSize: "0.875rem",
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
