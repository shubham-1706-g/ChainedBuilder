import React, { useEffect } from "react";

const Toast = ({ message, show, onDismiss }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;
  return (
    <div className="toast-enter fixed bottom-5 right-5 bg-gray-900 text-white py-3 px-5 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
};

export default Toast;
