import React from "react";
import useTheme from "../../../hooks/useTheme";

const universities = [
  {
    name: "Stanford University",
    country: "USA",
    logo: "https://i.ibb.co.com/5X68qcYp/uni9.jpg",
  },
  {
    name: "University of Cambridge",
    country: "UK",
    logo: "https://i.ibb.co.com/0S0c5ft/university.jpg",
  },
  {
    name: "ETH Zurich",
    country: "Switzerland",
    logo: "https://i.ibb.co.com/cV5P9hz/uni6.jpg",
  },
];

const FeaturedUniversities = () => {
  const { theme, colors } = useTheme();

  return (
    <section
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
        Featured Universities
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {universities.map((uni, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 border"
            style={{
              backgroundColor:
                theme === "dark" ? colors.dark.bgCard : colors.light.bgCard,
              borderColor:
                theme === "dark" ? colors.dark.border : colors.light.border,
              color:
                theme === "dark"
                  ? colors.dark.textPrimary
                  : colors.light.textPrimary,
            }}
          >
            <img
              src={uni.logo}
              alt={uni.name}
              className="w-24 h-24 object-contain rounded-full mb-3 border"
              style={{
                borderColor:
                  theme === "dark" ? colors.dark.border : colors.light.border,
              }}
            />
            <h3 className="text-lg font-semibold text-center">{uni.name}</h3>
            <p
              style={{
                color:
                  theme === "dark"
                    ? colors.dark.textSecondary
                    : colors.light.textSecondary,
              }}
            >
              {uni.country}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedUniversities;
