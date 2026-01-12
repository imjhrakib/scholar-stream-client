import React from "react";
import { motion } from "framer-motion";
import useTheme from "../../../hooks/useTheme";

const FAQ = () => {
  const { theme, colors } = useTheme();

  const faqs = [
    {
      question: "How do I apply for a scholarship?",
      answer:
        "Simply create an account, search for scholarships, and click 'View Details' to apply.",
    },
    {
      question: "Is there any fee for using this platform?",
      answer: "No, Scholar Stream is completely free for students.",
    },
    {
      question: "Can I apply to multiple scholarships?",
      answer:
        "Yes, you can apply to as many scholarships as you are eligible for.",
    },
  ];

  const bgSection = theme === "dark" ? colors.dark.bg : colors.light.bg;
  const textPrimary =
    theme === "dark" ? colors.dark.textPrimary : colors.light.textPrimary;
  const textSecondary =
    theme === "dark" ? colors.dark.textSecondary : colors.light.textSecondary;
  const bgCard = theme === "dark" ? colors.dark.bgCard : colors.light.bgCard;
  const borderColor =
    theme === "dark" ? colors.dark.primary : colors.light.primary;

  return (
    <section style={{ backgroundColor: bgSection }} className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: textPrimary }}
        >
          F.A.Q
        </h2>

        <div className="space-y-6 text-left">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 border-l-4"
              style={{
                backgroundColor: bgCard,
                color: textPrimary,
                borderColor: borderColor,
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <h4
                className="font-semibold text-lg mb-2"
                style={{ color: textPrimary }}
              >
                {f.question}
              </h4>
              <p style={{ color: textSecondary }}>{f.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
