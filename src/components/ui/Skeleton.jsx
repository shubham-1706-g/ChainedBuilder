import React from "react";

const Skeleton = ({ className }) => (
  <div
    className={`animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:1000px_100%] rounded-md ${className}`}
  ></div>
);

export default Skeleton;
