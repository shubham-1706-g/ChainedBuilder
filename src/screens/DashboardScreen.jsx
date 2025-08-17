import React from "react";
import Header from "../components/layout/Header";
import Icon from "../components/ui/Icon";

const DashboardScreen = ({ setSelectedWorkflow }) => {
  const QuickActionCard = ({ iconName, title, description }) => (
    <div className="card flex-1 p-6 flex items-start space-x-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <Icon name={iconName} className="w-8 h-8 text-indigo-600" />
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  const WorkflowStatusBadge = ({ status }) => {
    const statusMap = {
      Active: {
        icon: "CheckCircle2",
        badgeClass: "badge-green",
        text: "Active",
      },
      Paused: {
        icon: "PauseCircle",
        badgeClass: "badge-yellow",
        text: "Paused",
      },
      Error: { icon: "AlertCircle", badgeClass: "badge-red", text: "Error" },
    };
    const currentStatus = statusMap[status] || statusMap.Active;
    return (
      <div className={`badge ${currentStatus.badgeClass}`}>
        <Icon name={currentStatus.icon} className="w-4 h-4 mr-1.5" />
        {currentStatus.text}
      </div>
    );
  };

  const recentWorkflows = [
    {
      name: "Daily Report Email",
      status: "Active",
      lastRun: "2m ago",
      iconColor: "text-green-500",
    },
    {
      name: "Social Media Poster",
      status: "Paused",
      lastRun: "1d ago",
      iconColor: "text-yellow-500",
    },
    {
      name: "Database Backup",
      status: "Active",
      lastRun: "6h ago",
      iconColor: "text-green-500",
    },
    {
      name: "New User Onboarding",
      status: "Error",
      lastRun: "5m ago",
      iconColor: "text-red-500",
    },
  ];

  const activities = [
    {
      icon: "CheckCircle2",
      color: "text-green-500",
      text: <strong>Daily Report Email</strong>,
      time: "2m ago",
    },
    {
      icon: "AlertCircle",
      color: "text-red-500",
      text: <strong>New User Onboarding</strong>,
      time: "5m ago",
    },
    {
      icon: "Plug",
      color: "text-blue-500",
      text: "Connected to a new Slack workspace.",
      time: "1h ago",
    },
    {
      icon: "CheckCircle2",
      color: "text-green-500",
      text: <strong>Database Backup</strong>,
      time: "6h ago",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header
        title="Dashboard"
        subtitle="Welcome back, Alex! Here's what's happening."
      />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="flex space-x-4">
                <QuickActionCard
                  iconName="PlusCircle"
                  title="Create New"
                  description="Start a blank workflow."
                />
                <QuickActionCard
                  iconName="UploadCloud"
                  title="Import"
                  description="From a file or URL."
                />
                <QuickActionCard
                  iconName="Compass"
                  title="Explore Plugins"
                  description="Discover new integrations."
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Workflows
              </h2>
              <div className="card">
                <ul className="divide-y divide-gray-100">
                  {recentWorkflows.map((flow) => (
                    <li
                      key={flow.name}
                      onClick={() => setSelectedWorkflow(flow)}
                      className="p-4 flex items-center justify-between hover:bg-indigo-50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <Icon
                          name="Workflow"
                          className={`w-6 h-6 ${flow.iconColor}`}
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {flow.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Last run: {flow.lastRun}
                          </p>
                        </div>
                      </div>
                      <WorkflowStatusBadge status={flow.status} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                System Health
              </h2>
              <div className="card p-6">
                <p className="font-semibold text-gray-800 mb-4">
                  Status:{" "}
                  <span className="text-green-600">
                    All Systems Operational
                  </span>
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center">
                    <span>API</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Operational
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Executors</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Operational
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Database</span>
                    <span className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Operational
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Workflow Executions (24h)
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <button className="text-right text-xs text-indigo-600 hover:underline w-full mt-1">
                    95% Success Rate
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="Activity" className="w-5 h-5 mr-2" /> Live Activity
              </h2>
              <div className="card p-4">
                <ul className="space-y-3">
                  {activities.map((act, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm">
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon name={act.icon} className={act.color} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700">{act.text}</p>
                        <p className="text-xs text-gray-400">{act.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
