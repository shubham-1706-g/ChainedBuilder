import React from "react";

const Header = ({ title, subtitle, children }) => (
  <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10 flex-shrink-0">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500 mt-1">{subtitle}</p>
    </div>
    <div>{children}</div>
  </header>
);

export default Header;
