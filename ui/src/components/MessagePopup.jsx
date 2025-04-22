import React from 'react';

const MessagePopup = ({ message, onClose }) => (
  <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl z-50">
    <div className="flex items-center justify-between gap-4">
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold">&times;</button>
    </div>
  </div>
);

export default MessagePopup;
