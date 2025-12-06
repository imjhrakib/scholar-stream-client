import React from "react";

const SecondaryBtn = ({ btnText }) => {
  return (
    <div>
      <button className="btn btn-secondary hover:bg-[#1D4ED8]">
        {btnText}
      </button>
    </div>
  );
};

export default SecondaryBtn;
