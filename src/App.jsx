import React, { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Toast from "./components/ui/Toast";
import DashboardScreen from "./screens/DashboardScreen";
import WorkflowsScreen from "./screens/WorkflowsScreen";
import WorkflowReportScreen from "./screens/WorkflowReportScreen";
import ConnectionsScreen from "./screens/ConnectionsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import WorkflowBuilderCanvas from "./components/canvas/WorkflowBuilderCanvas";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [toastInfo, setToastInfo] = useState({ message: "", show: false });
  // State to toggle between dashboard UI and the builder canvas
  const [isBuilderMode, setIsBuilderMode] = useState(false);

  // Add state for dark mode
  const [isDark, setIsDark] = useState(false);

  // Add effect to toggle the 'dark' class on the root HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const showToast = (message) => {
    setToastInfo({ message, show: true });
  };

  const handleSetView = (view) => {
    setSelectedWorkflow(null); // Reset selected workflow when changing main view
    setCurrentView(view);
  };

  const renderView = () => {
    // If we have a selected workflow, show its report
    if (selectedWorkflow) {
      return (
        <WorkflowReportScreen
          workflow={selectedWorkflow}
          onBack={() => setSelectedWorkflow(null)}
        />
      );
    }
    // Otherwise, render the main view based on the sidebar selection
    switch (currentView) {
      case "workflows":
        return (
          <WorkflowsScreen
            setSelectedWorkflow={setSelectedWorkflow}
            showToast={showToast}
            // Pass function to enter builder mode
            enterBuilder={() => setIsBuilderMode(true)}
          />
        );
      case "connections":
        return <ConnectionsScreen showToast={showToast} />;
      case "settings":
        return (
          <SettingsScreen
            showToast={showToast}
            isDark={isDark}
            setIsDark={setIsDark}
          />
        );
      case "dashboard":
      default:
        return <DashboardScreen setSelectedWorkflow={setSelectedWorkflow} />;
    }
  };

  // The main logic: show the builder if in builder mode, otherwise show the dashboard UI
  if (isBuilderMode) {
    return (
      <div className="w-screen h-screen bg-white">
        <WorkflowBuilderCanvas onBack={() => setIsBuilderMode(false)} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-gray-100 text-gray-900">
      <Sidebar currentView={currentView} setView={handleSetView} />
      <div className="flex-1 relative flex flex-col">
        {renderView()}
        <Toast
          message={toastInfo.message}
          show={toastInfo.show}
          onDismiss={() => setToastInfo({ ...toastInfo, show: false })}
        />
      </div>
    </div>
  );
}
