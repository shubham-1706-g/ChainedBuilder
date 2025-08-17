import React from "react";
import Icon from "../ui/Icon";

const Sidebar = ({
  currentView,
  setView,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navItems = [
    { id: "dashboard", icon: "LayoutDashboard", label: "Dashboard" },
    { id: "workflows", icon: "Workflow", label: "Workflows" },
    { id: "connections", icon: "Plug", label: "Connections" },
  ];
  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Icon name="Workflow" className="w-7 h-7 mr-2 text-indigo-600" />{" "}
            Chained
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="button button-ghost p-2"
          data-testid="sidebar-toggle"
        >
          <Icon
            name={isCollapsed ? "ChevronsRight" : "ChevronsLeft"}
            className="w-5 h-5 text-gray-500"
          />
        </button>
      </div>
      <nav className="flex-grow p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            title={item.label}
            className={`button w-full mb-1 ${
              isCollapsed ? "justify-center" : "justify-start"
            } ${
              currentView === item.id
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "button-ghost"
            }`}
          >
            <Icon name={item.icon} className={`w-5 h-5 ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setView("profile")}
          data-testid="profile-button"
          className={`w-full button ${
            currentView === "profile"
              ? "bg-indigo-50 text-indigo-700 font-semibold"
              : "button-ghost"
          } ${isCollapsed ? "justify-center" : "justify-start"}`}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
              A
            </div>
            {!isCollapsed && (
              <div className="ml-3 text-left">
                <p className="font-semibold text-sm text-gray-800">
                  Alex Williams
                </p>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
            )}
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
