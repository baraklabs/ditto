// src/components/MessageBox.jsx
import React, { useEffect } from 'react';

const MessageBox = ({ type = 'success', message, onClose, duration = 3000 }) => {
  const baseStyle = 'fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50 text-sm font-medium transition-opacity duration-300';
  const typeStyles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}>
      {message}
    </div>
  );
};

export default MessageBox;
