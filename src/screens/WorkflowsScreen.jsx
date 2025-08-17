import React, { useState, useEffect } from "react";
import Icon from "../components/ui/Icon";
import Header from "../components/layout/Header";
import Modal from "../components/ui/Modal";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";

const WorkflowsScreen = ({ setSelectedWorkflow, showToast, enterBuilder }) => {
  // ... (paste the entire state and functions from the original WorkflowsScreen here)
  const [isLoading, setIsLoading] = useState(true);
  const [workflows, setWorkflows] = useState([
    {
      name: "Daily Report Email",
      status: "Active",
      trigger: "Schedule",
      lastRun: "15m ago",
    },
    {
      name: "Social Media Poster",
      status: "Paused",
      trigger: "Webhook",
      lastRun: "2d ago",
    },
    {
      name: "New User Onboarding",
      status: "Error",
      trigger: "API Call",
      lastRun: "1h ago",
    },
    {
      name: "Database Backup",
      status: "Active",
      trigger: "Schedule",
      lastRun: "8h ago",
    },
    {
      name: "Weekly Analytics Digest",
      status: "Active",
      trigger: "Schedule",
      lastRun: "3d ago",
    },
    {
      name: "Customer Support Triage",
      status: "Paused",
      trigger: "Email",
      lastRun: "5h ago",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [flowToDelete, setFlowToDelete] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 750);
    return () => clearTimeout(timer);
  }, []);

  const filteredWorkflows = workflows.filter(
    (flow) =>
      (statusFilter === "All" || flow.status === statusFilter) &&
      flow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(filteredWorkflows.map((f) => f.name));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (e, name) => {
    if (e.target.checked) {
      setSelected([...selected, name]);
    } else {
      setSelected(selected.filter((n) => n !== name));
    }
  };

  const openDeleteModal = (flow) => {
    setFlowToDelete(flow);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setWorkflows(workflows.filter((f) => f.name !== flowToDelete.name));
    showToast(`✅ Workflow "${flowToDelete.name}" deleted.`);
    setShowDeleteModal(false);
    setFlowToDelete(null);
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Active: "badge-green",
      Paused: "badge-yellow",
      Error: "badge-red",
    };
    return <span className={`badge ${styles[status]}`}>{status}</span>;
  };

  return (
    <>
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
      >
        {/* ... Modal content ... */}
        <p>
          Are you sure you want to delete the workflow "
          <strong>{flowToDelete?.name}</strong>"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="button button-secondary"
          >
            Cancel
          </button>
          <button onClick={confirmDelete} className="button button-danger">
            Delete
          </button>
        </div>
      </Modal>
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          title="Workflows"
          subtitle="Manage, create, and monitor your automations."
        >
          {/* THIS IS THE IMPORTANT CHANGE TO LAUNCH THE BUILDER */}
          <button onClick={enterBuilder} className="button button-primary">
            <Icon name="Plus" className="w-4 h-4 mr-2" /> Create New Flow
          </button>
        </Header>
        <main className="flex-1 p-6 overflow-y-auto">
          {/* ... (paste the rest of the WorkflowsScreen JSX here) ... */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-1">
              {["All", "Active", "Paused", "Error"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    statusFilter === status
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-72">
              <input
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md p-2"
              />
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              />
            </div>
          </div>

          {selected.length > 0 && (
            <div className="mb-4 bg-indigo-50 border border-indigo-200 p-3 rounded-lg flex justify-between items-center">
              <p className="font-semibold text-indigo-800">
                {selected.length} item(s) selected
              </p>
              <div className="space-x-2">
                <button className="button button-secondary">Activate</button>
                <button className="button button-secondary">Pause</button>
                <button className="button button-danger">Delete</button>
              </div>
            </div>
          )}

          <div className="card">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : filteredWorkflows.length > 0 ? (
              <table className="w-full text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="p-4 w-8">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selected.length === filteredWorkflows.length &&
                          filteredWorkflows.length > 0
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600">
                      Name
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600">
                      Status
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600">
                      Trigger
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600">
                      Last Run
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkflows.map((flow) => (
                    <tr
                      key={flow.name}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-indigo-50"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(flow.name)}
                          onChange={(e) => handleSelectOne(e, flow.name)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td
                        onClick={() => setSelectedWorkflow(flow)}
                        className="p-4 font-medium text-gray-800 cursor-pointer"
                      >
                        {flow.name}
                      </td>
                      <td
                        onClick={() => setSelectedWorkflow(flow)}
                        className="p-4 cursor-pointer"
                      >
                        <StatusBadge status={flow.status} />
                      </td>
                      <td
                        onClick={() => setSelectedWorkflow(flow)}
                        className="p-4 text-gray-600 cursor-pointer"
                      >
                        {flow.trigger}
                      </td>
                      <td
                        onClick={() => setSelectedWorkflow(flow)}
                        className="p-4 text-gray-600 cursor-pointer"
                      >
                        {flow.lastRun}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(flow);
                          }}
                          className="button button-ghost p-2 text-red-500 hover:bg-red-100"
                        >
                          <Icon name="Trash2" className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState
                iconName="Workflow"
                title="No Workflows Found"
                message="Try adjusting your filters or create a new workflow."
                action={
                  <button
                    onClick={enterBuilder}
                    className="button button-primary"
                  >
                    <Icon name="Plus" className="w-4 h-4 mr-2" /> Create New
                    Flow
                  </button>
                }
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default WorkflowsScreen;
