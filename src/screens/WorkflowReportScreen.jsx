import React, { useState } from "react";
import Header from "../components/layout/Header";
import Icon from "../components/ui/Icon";

const WorkflowReportScreen = ({ workflow, onBack }) => {
  const chartData = [65, 59, 80, 81, 56, 55, 40, 88, 62, 75, 90, 83];
  const logs = [
    {
      id: "run_1a2b3c",
      status: "Success",
      timestamp: "2025-08-16 21:05:14",
      duration: "1.2s",
      details: { input: '{ "user": "alex" }', output: '{ "status": "ok" }' },
    },
    {
      id: "run_4d5e6f",
      status: "Success",
      timestamp: "2025-08-16 20:05:11",
      duration: "1.1s",
      details: { input: '{ "user": "jane" }', output: '{ "status": "ok" }' },
    },
    {
      id: "run_7g8h9i",
      status: "Failed",
      timestamp: "2025-08-16 19:05:23",
      duration: "0.5s",
      details: {
        error: "API connection timed out",
        input: '{ "user": "mike" }',
      },
    },
  ];

  const [activeLog, setActiveLog] = useState(null);
  const [logSearch, setLogSearch] = useState("");
  const [logFilter, setLogFilter] = useState("All");

  const filteredLogs = logs.filter(
    (log) =>
      (logFilter === "All" || log.status === logFilter) &&
      log.id.toLowerCase().includes(logSearch.toLowerCase())
  );

  const StatusBadge = ({ status }) => {
    const styles = { Success: "badge-green", Failed: "badge-red" };
    return <span className={`badge ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <Header
        title={workflow.name}
        subtitle="Detailed execution report and logs."
      >
        <button onClick={onBack} className="button button-secondary">
          <Icon name="ArrowLeft" className="w-4 h-4 mr-2" /> Back to Workflows
        </button>
      </Header>
      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="card p-4 text-center">
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="text-3xl font-bold text-green-600">98.7%</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-sm text-gray-500">Avg. Duration</p>
            <p className="text-3xl font-bold text-gray-800">1.3s</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-sm text-gray-500">Total Runs (24h)</p>
            <p className="text-3xl font-bold text-gray-800">1,204</p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Icon name="BarChart3" className="w-5 h-5 mr-2 text-indigo-600" />{" "}
            Execution History (Last 12 Hours)
          </h3>
          <div className="flex items-end h-48 space-x-2 group">
            {chartData.map((val, i) => (
              <div
                key={i}
                className="relative flex-1 bg-indigo-200 hover:bg-indigo-400 rounded-t-md cursor-pointer"
                style={{
                  height: `${val}%`,
                  transition: "background-color 0.2s",
                }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none">
                  {val} runs
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Recent Logs</h3>
            <div className="flex items-center space-x-4">
              <div className="relative w-64">
                <input
                  placeholder="Search by Run ID..."
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md p-2 text-sm"
                />
                <Icon
                  name="Search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                />
              </div>
              <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
                {["All", "Success", "Failed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setLogFilter(f)}
                    className={`px-3 py-1 text-sm rounded ${
                      logFilter === f ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Status
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Timestamp
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Duration
                </th>
                <th className="p-4 font-semibold text-sm text-gray-600">
                  Run ID
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr
                    onClick={() =>
                      setActiveLog(activeLog === log.id ? null : log.id)
                    }
                    className="border-b border-gray-100 last:border-b-0 hover:bg-indigo-50 cursor-pointer"
                  >
                    <td className="p-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="p-4 text-gray-600 font-mono text-sm">
                      {log.timestamp}
                    </td>
                    <td className="p-4 text-gray-600">{log.duration}</td>
                    <td className="p-4 text-gray-600 font-mono text-xs">
                      {log.id}
                    </td>
                  </tr>
                  {activeLog === log.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="p-4">
                        <h4 className="font-semibold mb-2">Log Details</h4>
                        <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-xs overflow-x-auto">
                          <pre>{JSON.stringify(log.details, null, 2)}</pre>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default WorkflowReportScreen;
