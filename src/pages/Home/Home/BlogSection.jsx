import React from "react";
import useTheme from "../../../hooks/useTheme";

const posts = [
  {
    title: "5 Tips to Write a Winning Scholarship Essay",
    date: "Jan 10, 2026",
  },
  {
    title: "Top 10 Scholarships for International Students",
    date: "Jan 5, 2026",
  },
  { title: "How to Prepare for Scholarship Interviews", date: "Dec 28, 2025" },
];

const BlogSection = () => {
  const { theme, colors } = useTheme();

  return (
    <div
      className="px-6 md:px-16 py-12 rounded-3xl"
      style={{
        backgroundColor: theme === "dark" ? colors.dark.bg : colors.light.bg,
      }}
    >
      <h2
        className="text-3xl font-bold mb-6"
        style={{
          color:
            theme === "dark"
              ? colors.dark.textPrimary
              : colors.light.textPrimary,
        }}
      >
        Blog & Tips
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300 border"
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
            <h3
              className="text-xl font-semibold mb-2"
              style={{
                color:
                  theme === "dark"
                    ? colors.dark.textPrimary
                    : colors.light.textPrimary,
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                color:
                  theme === "dark"
                    ? colors.dark.textSecondary
                    : colors.light.textSecondary,
              }}
            >
              {post.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
