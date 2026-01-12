import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import useTheme from "../hooks/useTheme";

const DemoCredentials = () => {
  const { theme, colors } = useTheme();
  const [show, setShow] = useState(false);

  return (
    <div
      className="my-4 p-4 rounded-lg border transition-all"
      style={{
        backgroundColor:
          theme === "dark" ? colors.dark.bgCard : colors.light.bgCard,
        borderColor: colors[theme].border,
        color: colors[theme].textPrimary,
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <p className="font-semibold" style={{ color: colors[theme].primary }}>
          Demo Login Credentials
        </p>
        {show ? <FiMinus size={18} /> : <FiPlus size={18} />}
      </div>

      {/* Content */}
      {show && (
        <div className="mt-3 space-y-2 text-sm">
          <p>
            🎓 <span className="font-medium">Student:</span>{" "}
            <span
              className="select-all font-semibold"
              style={{ color: "#14B8A6" }} // teal
            >
              student@demo.com
            </span>
          </p>

          <p>
            🛡 <span className="font-medium">Moderator:</span>{" "}
            <span
              className="select-all font-semibold"
              style={{ color: "#3B82F6" }} // blue
            >
              moderator@demo.com
            </span>
          </p>

          <p>
            👑 <span className="font-medium">Admin:</span>{" "}
            <span
              className="select-all font-semibold"
              style={{ color: "#8B5CF6" }} // purple
            >
              admin@demo.com
            </span>
          </p>

          <p className="pt-1">
            🔑 <span className="font-medium">Password:</span>{" "}
            <span className="select-all font-semibold text-orange-500">
              Rr@123456
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;
