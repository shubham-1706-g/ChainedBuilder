import React from "react";
import {
  ChevronLeft,
  ZoomOut,
  ZoomIn,
  MousePointer,
  Save,
  Play,
} from "lucide-react";
import ToolbarButton from "../ui/ToolbarButton";

const TopToolbar = ({ onBack, view, setView }) => (
  <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-2xl p-2 flex items-center space-x-1 border border-gray-200 dark:border-gray-700">
    <button
      onClick={onBack}
      className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <ChevronLeft size={18} /> Exit
    </button>
    <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-2"></div>
    <ToolbarButton
      icon={<ZoomOut />}
      onClick={() =>
        setView((v) => ({ ...v, zoom: Math.max(0.2, v.zoom / 1.2) }))
      }
    />
    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 w-12 text-center">
      {Math.round(view.zoom * 100)}%
    </div>
    <ToolbarButton
      icon={<ZoomIn />}
      onClick={() =>
        setView((v) => ({ ...v, zoom: Math.min(3, v.zoom * 1.2) }))
      }
    />
    <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-2"></div>
    <ToolbarButton
      icon={<MousePointer />}
      onClick={() => setView({ x: 0, y: 0, zoom: 1 })}
    />
    <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-2"></div>
    <ToolbarButton icon={<Save />} text="Save" />
    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-xl hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105">
      <Play size={16} /> Run
    </button>
  </div>
);

export default TopToolbar;
