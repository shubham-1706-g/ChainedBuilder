import React from "react";

const ToolbarButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-2 ${
      text ? "px-3" : ""
    }`}
  >
    {React.cloneElement(icon, { size: 20 })}
    {text && <span className="text-sm font-semibold">{text}</span>}
  </button>
);

export default ToolbarButton;
