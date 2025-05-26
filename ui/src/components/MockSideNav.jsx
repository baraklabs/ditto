import React, { useState } from 'react';
import { Plus, Pencil, Trash } from 'lucide-react';
import CollectionPopup from './CollectionPopup';

const MockSideNav = ({ collections, expanded, setExpanded, setSelectedMock, setView, onRenameCollection,
  refreshCollections, onDeleteCollection }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleRename = (index) => {
    const trimmedNewValue = editValue.trim();
    const originalValue = collections[index].name;
    debugger
    if (
      trimmedNewValue &&
      trimmedNewValue !== originalValue
    ) {
      onRenameCollection(index, trimmedNewValue);
    }
    setEditingIndex(null);
  };

  return (
    <div className="w-1/4 pr-4 border-r border-gray-700 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mb-8">
          <button
            onClick={() => {
              setSelectedMock(null);
              setView('create');
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Mock
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Mock Collections</h3>
          <button onClick={() => setShowPopup(true)}>
            <Plus className="text-white hover:text-green-400" />
          </button>
          {showPopup && <CollectionPopup onClose={() => setShowPopup(false)} refreshCollections={refreshCollections} />}
        </div>

        {collections.length === 0 ? (
          <p className="text-sm text-gray-500 px-2">No collections found.</p>
        ) : (
          collections.map((collection, i) => (
            <div key={i} className="mb-4">
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded hover:bg-gray-700">
                {editingIndex === i ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleRename(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename(i);
                      if (e.key === 'Escape') setEditingIndex(null);
                    }}
                    className="bg-gray-900 text-white text-sm px-2 py-1 rounded w-full"
                  />
                ) : (
                  <button
                    onClick={() => toggleExpand(i)}
                    className="text-left font-medium text-sm text-white w-full"
                  >
                    {collection.name}
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditValue(collection.name);
                    setEditingIndex(i);
                  }}
                  className="text-gray-400 hover:text-white"
                  title="Edit collection name"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    const confirmed = window.confirm("This will delete the collection and all its mocks. Are you sure?");
                    if (confirmed) {
                      onDeleteCollection(i); // You'll pass this as a prop
                    }
                  }}
                  className="text-red-400 hover:text-red-600"
                  title="Delete collection"
                >
                  <Trash size={16} />
                </button>

              </div>
              {expanded === i && (
                <ul className="mt-2 pl-4 space-y-2">
                  {collection.mocks.map((mock, j) => (
                    <li key={j}>
                      <button
                        onClick={() => {
                          setSelectedMock({ ...mock, collectionId: collection.id });
                          setView('collection');
                        }}
                        className="text-left text-sm text-gray-300 hover:text-white"
                      >
                        {mock.name || 'Untitled Mock'}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-auto border-t border-gray-700 pt-4 pb-6 px-4 text-sm text-gray-400">
        <a
          href="https://baraklabs.com/ditto/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-white mb-1"
        >
          Docs
        </a>
        <a
          href="https://baraklabs.com/contact-us"
          target="_blank"
          className="block hover:text-white mb-1"
        >
          Contact Us
        </a>
        <span className="text-xs text-gray-500">v1.0.0</span>
      </div>
    </div>
  );
};

export default MockSideNav;
