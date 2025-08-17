import React, { useState } from "react";
import Header from "../components/layout/Header";
import Icon from "../components/ui/Icon";
import Modal from "../components/ui/Modal";

const ConnectionsScreen = ({ showToast }) => {
  const [filter, setFilter] = useState("available");
  const [connections, setConnections] = useState([
    {
      name: "Gmail",
      category: "Email",
      connected: true,
      iconName: "Mail",
      color: "red-500",
    },
    {
      name: "OpenAI",
      category: "AI",
      connected: true,
      iconName: "BrainCircuit",
      color: "green-500",
    },
    {
      name: "Slack",
      category: "Chat",
      connected: true,
      iconName: "MessageSquare",
      color: "purple-500",
    },
    {
      name: "Notion",
      category: "Productivity",
      connected: false,
      iconName: "Database",
      color: "gray-800",
    },
    {
      name: "Gemini",
      category: "AI",
      connected: false,
      iconName: "BrainCircuit",
      color: "blue-500",
    },
    {
      name: "Stripe",
      category: "Payments",
      connected: false,
      iconName: "CreditCard",
      color: "indigo-500",
    },
    {
      name: "Firebase",
      category: "Database",
      connected: false,
      iconName: "Database",
      color: "yellow-500",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentConnection, setCurrentConnection] = useState(null);

  const handleConnectClick = (conn) => {
    setCurrentConnection(conn);
    setIsModalOpen(true);
  };

  const handleSaveConnection = () => {
    setConnections(
      connections.map((c) =>
        c.name === currentConnection.name ? { ...c, connected: true } : c
      )
    );
    setIsModalOpen(false);
    showToast(`✅ Successfully connected to ${currentConnection.name}!`);
    setCurrentConnection(null);
  };

  const filteredConnections = connections.filter((c) =>
    filter === "available" ? true : c.connected
  );

  return (
    <>
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Connect to ${currentConnection?.name}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please enter your API Key for {currentConnection?.name} to continue.
          </p>
          <div>
            <label className="text-sm font-medium text-gray-700">API Key</label>
            <input
              type="password"
              placeholder="••••••••••••••••••••"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="button button-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveConnection}
              className="button button-primary"
            >
              Save Connection
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          title="Connections"
          subtitle="Connect your apps to build powerful automations."
        />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <button
                onClick={() => setFilter("available")}
                className={`button mr-2 ${
                  filter === "available" ? "button-primary" : "button-secondary"
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setFilter("yours")}
                className={`button ${
                  filter === "yours" ? "button-primary" : "button-secondary"
                }`}
              >
                Your Connections
              </button>
            </div>
            <div className="relative w-64">
              <input
                placeholder="Search connections..."
                className="pl-10 w-full border border-gray-300 rounded-md p-2"
              />
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConnections.map((conn) => (
              <div
                key={conn.name}
                className="card p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${conn.color}/10`}
                    >
                      <Icon
                        name={conn.iconName}
                        className={`w-7 h-7 text-${conn.color}`}
                      />
                    </div>
                    {conn.connected && (
                      <span className="badge badge-green">
                        <Icon name="CheckCircle2" className="w-3 h-3 mr-1" />
                        Connected
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {conn.name}
                    </h3>
                    <p className="text-sm text-gray-500">{conn.category}</p>
                  </div>
                </div>
                <div className="mt-6">
                  {conn.connected ? (
                    <button className="button button-secondary w-full">
                      Manage
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnectClick(conn)}
                      className="button button-primary w-full"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default ConnectionsScreen;
