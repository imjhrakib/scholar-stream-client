import React from "react";
import useTheme from "../../hooks/useTheme";

const Contact = () => {
  const { theme, colors } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: colors[theme].bg }}
    >
      <div
        className="w-full max-w-3xl p-8 rounded-xl shadow-lg"
        style={{
          backgroundColor: colors[theme].bgCard,
          color: colors[theme].textPrimary,
        }}
      >
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: colors[theme].primary }}
        >
          Contact Us
        </h2>

        {/* Contact Info */}
        <div className="mb-6 space-y-2">
          <p>
            Email:{" "}
            <span style={{ color: colors[theme].textSecondary }}>
              jhrakib.dev@gmail.com
            </span>
          </p>
          <p>
            Phone:{" "}
            <span style={{ color: colors[theme].textSecondary }}>
              +880 1624639841
            </span>
          </p>
          <p>
            Address:{" "}
            <span style={{ color: colors[theme].textSecondary }}>
              Dhaka, Bangladesh
            </span>
          </p>
        </div>

        {/* Contact Form */}
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="textarea textarea-bordered w-full"
            style={{
              backgroundColor: colors[theme].bg,
              color: colors[theme].textPrimary,
              borderColor: colors[theme].border,
            }}
          />
          <button
            type="submit"
            className="btn w-full mt-2"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(to right,#4FD1C5,#38B2AC)"
                  : "linear-gradient(to right,#3B82F6,#6366F1)",
              color: "#fff",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
