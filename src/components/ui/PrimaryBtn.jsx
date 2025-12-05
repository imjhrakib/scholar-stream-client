import React from "react";

const PrimaryBtn = ({ btnText }) => {
  return (
    <div>
      <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white">
        {btnText}
      </button>
    </div>
  );
};

export default PrimaryBtn;
