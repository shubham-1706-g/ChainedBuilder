import React, { useState } from "react";
import Header from "../components/layout/Header";
import Icon from "../components/ui/Icon";

const ProfileScreen = ({ showToast, isDark, setIsDark }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Williams",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "appearance", label: "Appearance", icon: "Sun" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "developerApi", label: "Developer API", icon: "KeyRound" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "appearance":
        return (
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Appearance</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Toggle Dark Mode</span>
              <div className="flex items-center space-x-2">
                <Icon name="Sun" className="w-5 h-5 text-yellow-500" />
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isDark}
                    onChange={() => setIsDark(!isDark)}
                  />
                  <span className="slider"></span>
                </label>
                <Icon name="Moon" className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p>Email on workflow failure</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <p>Weekly summary email</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <p>Product updates</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        );
      case "developerApi":
        return (
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Developer API Keys</h3>
            <p className="text-sm text-gray-500 mb-4">
              Manage API keys for programmatic access to the ChainedBuilder
              platform.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md transition-colors hover:bg-gray-100">
                <div>
                  <p className="font-mono text-sm">prod_sk_..._a1b2</p>
                  <p className="text-xs text-gray-500">
                    Default Key (Full Access)
                  </p>
                </div>
                <button
                  onClick={() => showToast("✅ API Key copied!")}
                  className="button button-ghost p-2"
                >
                  <Icon name="Copy" className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button className="button button-secondary mt-4">
              <Icon name="Plus" className="w-4 h-4 mr-2" /> Generate New Key
            </button>
          </div>
        );
      case "profile":
      default:
        return (
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header
        title="Profile & Settings"
        subtitle="Manage your profile and account preferences."
      />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto flex space-x-8">
          <div className="w-1/4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`button w-full justify-start ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "button-ghost"
                  }`}
                >
                  <Icon name={tab.icon} className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="w-3/4">
            {renderTabContent()}
            <div className="flex justify-end space-x-2 mt-6">
              <button className="button button-secondary">Cancel</button>
              <button
                onClick={() => showToast("✅ Settings saved!")}
                className="button button-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileScreen;
