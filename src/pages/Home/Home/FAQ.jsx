import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
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

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">F.A.Q</h2>

        <div className="space-y-6 text-left">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded shadow-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <h4 className="font-semibold text-lg mb-1">{f.question}</h4>
              <p className="text-gray-700">{f.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
