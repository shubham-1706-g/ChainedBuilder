import React from "react";
import { Plus, X } from "lucide-react";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 72;

const CanvasOverlay = ({ nodes, connections, onAddClick, onDeleteClick }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <svg
        className="w-full h-full connections-svg"
        style={{ width: "10000px", height: "10000px" }}
      >
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              className="fill-current text-gray-400 dark:text-gray-500"
            />
          </marker>
        </defs>
        <g>
          {connections.map((conn, index) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            const startX = fromNode.x + NODE_WIDTH;
            const startY = fromNode.y + NODE_HEIGHT / 2;
            const endX = toNode.x;
            const endY = toNode.y + NODE_HEIGHT / 2;
            const pathData = `M ${startX} ${startY} C ${
              startX + 60
            } ${startY}, ${endX - 60} ${endY}, ${endX} ${endY}`;
            return (
              <path
                key={index}
                d={pathData}
                strokeWidth="2.5"
                markerEnd="url(#arrowhead)"
                className="stroke-current text-gray-400 dark:text-gray-500 fill-none"
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
        {connections.map((conn, index) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return null;
          const midX = (fromNode.x + NODE_WIDTH + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2 + NODE_HEIGHT / 2;
          return (
            <div
              key={`btn-group-${index}`}
              className="group absolute"
              style={{ left: midX - 26, top: midY - 14 }}
            >
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    onAddClick({ type: "connection", connection: conn })
                  }
                  className="w-7 h-7 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => onDeleteClick(conn)}
                  className="w-7 h-7 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-red-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {nodes
          .filter((n) => !connections.some((c) => c.from === n.id))
          .map((node) => (
            <div
              key={`end-btn-${node.id}`}
              className="group absolute"
              style={{
                left: node.x + NODE_WIDTH,
                top: node.y + NODE_HEIGHT / 2 - 14,
              }}
            >
              <button
                onClick={() =>
                  onAddClick({ type: "end-node", nodeId: node.id })
                }
                className="w-7 h-7 ml-2 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <Plus size={16} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CanvasOverlay;
