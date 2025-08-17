import React from "react";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 72;

const CanvasNode = ({ node, onNodeMouseDown, onClick }) => {
  return (
    <div
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        width: `${NODE_WIDTH}px`,
        height: `${NODE_HEIGHT}px`,
        pointerEvents: "auto",
      }}
      className="absolute group"
      onMouseDown={onNodeMouseDown}
    >
      <div
        className="w-full h-full flex items-center gap-3 bg-white dark:bg-gray-600 shadow-xl rounded-2xl p-4 border-2 border-transparent group-hover:border-blue-500 cursor-grab active:cursor-grabbing transition-colors "
        onClick={onClick}
      >
        <div className="p-2 bg-gray-100 dark:bg-white rounded-lg pointer-events-none">
          {node.icon}
        </div>
        <p className="font-semibold pointer-events-none flex-1 truncate text-white">
          {node.title}
        </p>
      </div>
    </div>
  );
};

export default CanvasNode;
