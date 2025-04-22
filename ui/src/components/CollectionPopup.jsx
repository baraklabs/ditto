import React, { useState } from 'react';
import MessageBox from './MessageBox';
import { createCollection } from '../services/collectionService';

const CollectionPopup = ({ onClose }) => {
  const [collectionName, setCollectionName] = useState('');
  const [message, setMessage] = useState(null);

  const handleCreate = async () => {
    try {
      await createCollection(collectionName);
      setMessage({ type: 'success', text: 'Collection created successfully!' });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-white">
        <h3 className="text-xl font-semibold mb-4">Create New Collection</h3>

        {message && (
          <MessageBox
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        )}
        <input
          type="text"
          placeholder="Collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white mb-4"
        />

        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionPopup;
