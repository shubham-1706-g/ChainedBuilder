import React from "react";

const SidebarLink = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
      active
        ? "bg-blue-500 text-white shadow-lg"
        : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
  >
    {React.cloneElement(icon, { size: 20 })}
    <span>{text}</span>
  </button>
);

export default SidebarLink;
