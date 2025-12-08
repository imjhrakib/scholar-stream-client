import React from "react";
import { motion } from "framer-motion";

const SuccessStories = () => {
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Success Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <p className="text-gray-700 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border"
                />
                <div className="text-left">
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
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
