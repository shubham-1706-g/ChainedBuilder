import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Zap,
  BrainCircuit,
  AlertTriangle,
  Repeat,
  Shuffle,
  MessageSquare,
} from "lucide-react";
import CanvasNode from "./CanvasNode";
import CanvasOverlay from "./CanvasOverlay";
import TopToolbar from "../layout/TopToolbar";
import PropertiesPanel from "../panel/PropertiesPanel";
import NodePalette from "../panel/NodePalette.jsx";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 72;

const initialNodes = [
  {
    id: "node-1",
    type: "trigger",
    x: 150,
    y: 200,
    title: "Webhook Trigger",
    icon: <Zap className="text-yellow-500" />,
  },
  {
    id: "node-2",
    type: "action",
    x: 500,
    y: 200,
    title: "Send Confirmation",
    icon: <Mail className="text-red-500" />,
  },
];
const initialConnections = [{ from: "node-1", to: "node-2" }];

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

const getNodeDefinition = (name) => {
  for (const category of Object.values(NODE_PALETTE_ITEMS)) {
    const found = category.find((item) => item.name === name);
    if (found) return found;
  }
  return null;
};

const WorkflowBuilderCanvas = ({ onBack }) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [connections, setConnections] = useState(initialConnections);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [paletteState, setPaletteState] = useState({
    isOpen: false,
    context: null,
  });
  const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });

  const canvasRef = useRef(null);
  const stateRef = useRef({
    isPanning: false,
    isDraggingNode: false,
    dragStart: { x: 0, y: 0 },
    dragNodeInfo: null,
  });

  const handleWheel = (e) => {
    e.preventDefault();
    const { clientX, clientY, deltaY } = e;
    const zoomFactor = 1.1;
    const newZoom =
      deltaY < 0 ? view.zoom * zoomFactor : view.zoom / zoomFactor;
    const clampedZoom = Math.max(0.2, Math.min(3, newZoom));
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = clientX - canvasRect.left;
    const mouseY = clientY - canvasRect.top;
    const newX = view.x + (mouseX - view.x) * (1 - clampedZoom / view.zoom);
    const newY = view.y + (mouseY - view.y) * (1 - clampedZoom / view.zoom);
    setView({ x: newX, y: newY, zoom: clampedZoom });
  };

  const handleMouseDown = (e) => {
    if (
      e.target === canvasRef.current ||
      e.target.closest(".connections-svg")
    ) {
      stateRef.current.isPanning = true;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e) => {
    const { isPanning, isDraggingNode, dragStart, dragNodeInfo } =
      stateRef.current;
    if (isPanning) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setView((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    } else if (isDraggingNode) {
      const dx = (e.clientX - dragStart.x) / view.zoom;
      const dy = (e.clientY - dragStart.y) / view.zoom;
      setNodes((prev) =>
        prev.map((n) =>
          n.id === dragNodeInfo.id
            ? { ...n, x: dragNodeInfo.startX + dx, y: dragNodeInfo.startY + dy }
            : n
        )
      );
    }
  };

  const handleMouseUp = () => {
    stateRef.current.isPanning = false;
    stateRef.current.isDraggingNode = false;
    stateRef.current.dragNodeInfo = null;
  };

  const handleNodeDragStart = (e, node) => {
    e.stopPropagation();
    stateRef.current.isDraggingNode = true;
    stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    stateRef.current.dragNodeInfo = {
      id: node.id,
      startX: node.x,
      startY: node.y,
    };
  };

  const handleAddNode = (nodeName) => {
    const definition = getNodeDefinition(nodeName);
    if (!definition) return;
    const newNode = {
      id: `node-${Date.now()}`,
      type: "action",
      title: definition.name,
      icon: definition.icon,
    };

    if (paletteState.context.type === "end-node") {
      const fromNode = nodes.find((n) => n.id === paletteState.context.nodeId);
      newNode.x = fromNode.x + NODE_WIDTH + 150;
      newNode.y = fromNode.y;
      setNodes((prev) => [...prev, newNode]);
      setConnections((prev) => [
        ...prev,
        { from: fromNode.id, to: newNode.id },
      ]);
    } else if (paletteState.context.type === "connection") {
      const { from, to } = paletteState.context.connection;
      const fromNode = nodes.find((n) => n.id === from);
      const toNode = nodes.find((n) => n.id === to);
      newNode.x = (fromNode.x + toNode.x) / 2;
      newNode.y = (fromNode.y + toNode.y) / 2;
      setNodes((prev) => [...prev, newNode]);
      setConnections((prev) => [
        ...prev.filter((c) => !(c.from === from && c.to === to)),
        { from, to: newNode.id },
        { from: newNode.id, to },
      ]);
    }
    setPaletteState({ isOpen: false, context: null });
  };

  const handleDeleteConnection = (connToDelete) => {
    setConnections((prev) =>
      prev.filter(
        (c) => !(c.from === connToDelete.from && c.to === connToDelete.to)
      )
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [view.zoom, view.x, view.y]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="flex-1 flex h-full overflow-hidden">
      <div
        ref={canvasRef}
        className="flex-1 relative bg-dot-grid dark:bg-dot-grid-dark cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <TopToolbar onBack={onBack} view={view} setView={setView} />
        <div
          className="canvas-transform-group"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        >
          <CanvasOverlay
            nodes={nodes}
            connections={connections}
            onAddClick={(context) => setPaletteState({ isOpen: true, context })}
            onDeleteClick={handleDeleteConnection}
          />
          {nodes.map((node) => (
            <CanvasNode
              key={node.id}
              node={node}
              onNodeMouseDown={(e) => handleNodeDragStart(e, node)}
              onClick={() => setSelectedNodeId(node.id)}
            />
          ))}
        </div>
      </div>
      <div className="relative w-96">
        <PropertiesPanel selectedNode={selectedNode} />
        <NodePalette
          isOpen={paletteState.isOpen}
          onSelectNode={handleAddNode}
          onClose={() => setPaletteState({ isOpen: false, context: null })}
        />
      </div>
    </div>
  );
};
export default WorkflowBuilderCanvas;
