import React from 'react';

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-gray-800 text-white rounded-xl p-6 shadow-2xl w-full max-w-md relative">
      <button onClick={onClose} className="absolute top-2 right-4 text-xl">&times;</button>
      <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
      {children}
    </div>
  </div>
);

export default Modal;
