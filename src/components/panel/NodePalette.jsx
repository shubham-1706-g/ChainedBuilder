import React from "react";
import {
  X,
  Mail,
  MessageSquare,
  BrainCircuit,
  AlertTriangle,
  Repeat,
  Shuffle,
} from "lucide-react";

const NODE_PALETTE_ITEMS = {
  connections: [
    { name: "Gmail", icon: <Mail className="text-red-500" /> },
    { name: "Slack", icon: <MessageSquare className="text-purple-500" /> },
    { name: "OpenAI", icon: <BrainCircuit className="text-green-500" /> },
  ],
  logicBlocks: [
    { name: "Condition", icon: <AlertTriangle className="text-yellow-500" /> },
    { name: "Loop", icon: <Repeat className="text-blue-500" /> },
    { name: "Switch", icon: <Shuffle className="text-orange-500" /> },
  ],
};

const NodeList = ({ title, items, onClick }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
      {title}
    </h3>
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          onClick={() => onClick(item.name)}
        >
          <div className="flex items-center gap-3">
            {React.cloneElement(item.icon, { size: 20 })}
            <span className="font-medium text-sm">{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const NodePalette = ({ isOpen, onSelectNode, onClose }) => (
  <aside
    className={`w-full h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-l border-gray-200 dark:border-gray-700 flex flex-col absolute top-0 left-0 transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <h2 className="text-xl font-bold">Add a Node</h2>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <X size={20} />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <NodeList
        title="Connections"
        items={NODE_PALETTE_ITEMS.connections}
        onClick={onSelectNode}
      />
      <NodeList
        title="Logic Blocks"
        items={NODE_PALETTE_ITEMS.logicBlocks}
        onClick={onSelectNode}
      />
    </div>
  </aside>
);

export default NodePalette;
