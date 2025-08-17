import React from "react";

const PropertiesPanel = ({ selectedNode }) => (
  <aside className="w-full h-full bg-blue-100 border-l border-black flex flex-col absolute top-0 left-0 text-black">
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold">
        {selectedNode ? selectedNode.title : "Properties"}
      </h2>
    </div>
    <div className="flex-1 p-4 overflow-y-auto">
      {selectedNode ? (
        <p>Configuration options for {selectedNode.title} go here.</p>
      ) : (
        <p className="text-gray-500">Select a node to see its properties.</p>
      )}
    </div>
  </aside>
);

export default PropertiesPanel;
