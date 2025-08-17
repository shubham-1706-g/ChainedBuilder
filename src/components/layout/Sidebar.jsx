import React from "react";
import Icon from "../ui/Icon";

const Sidebar = ({ currentView, setView }) => {
  const navItems = [
    { id: "dashboard", icon: "LayoutDashboard", label: "Dashboard" },
    { id: "workflows", icon: "Workflow", label: "Workflows" },
    { id: "connections", icon: "Plug", label: "Connections" },
    { id: "settings", icon: "Settings", label: "Settings" },
  ];
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Icon name="Workflow" className="w-7 h-7 mr-2 text-indigo-600" />{" "}
          Chained
        </h1>
      </div>
      <nav className="flex-grow p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`button w-full justify-start mb-1 ${
              currentView === item.id
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "button-ghost"
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 mr-3" /> {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div className="ml-3">
            <p className="font-semibold text-sm text-gray-800">Alex Williams</p>
            <p className="text-xs text-gray-500">Pro Plan</p>
          </div>
          <button className="button button-ghost p-2 ml-auto">
            <Icon name="ChevronRight" className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
