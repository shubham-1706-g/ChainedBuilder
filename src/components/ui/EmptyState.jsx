import React from "react";
import Icon from "./Icon";

const EmptyState = ({ iconName, title, message, action }) => (
  <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">
      <Icon name={iconName} />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-800">{title}</h3>
    <p className="mt-1 text-gray-500">{message}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
