import React from "react";

const SecondaryBtn = ({ btnText }) => {
  return (
    <div>
      <button className="btn btn-secondary hover:bg-[#0b7dda]">
        {btnText}
      </button>
    </div>
  );
};

export default SecondaryBtn;
