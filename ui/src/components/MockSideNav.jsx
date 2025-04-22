import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CollectionPopup from './CollectionPopup';

const MockSideNav = ({ collections, expanded, setExpanded, setSelectedMock, setView }) => {
  const [showPopup, setShowPopup] = useState(false);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="w-1/4 pr-4 border-r border-gray-700  flex flex-col">
      {/* Main content with scrollable area */}
      <div className="flex-1 overflow-y-auto">
        {/* Create Mock Button */}
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

        {/* Collections Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Mock Collections</h3>
          <button onClick={() => setShowPopup(true)}>
            <Plus className="text-white hover:text-green-400" />
          </button>
          {showPopup && <CollectionPopup onClose={() => setShowPopup(false)} />}
        </div>

        {/* Collections */}
        {collections.length === 0 ? (
          <p className="text-sm text-gray-500 px-2">No collections found.</p>
        ) : (
          collections.map((collection, i) => (
            <div key={i} className="mb-4">
              <button
                onClick={() => toggleExpand(i)}
                className="w-full text-left font-medium text-sm bg-gray-800 p-3 rounded hover:bg-gray-700"
              >
                {collection.name}
              </button>
              {expanded === i && (
                <ul className="mt-2 pl-4 space-y-2">
                  {collection.mocks.map((mock, j) => {
                    const mockName = mock.name || `Untitled Mock`;
                    return (
                      <li key={j}>
                        <button
                          onClick={() => {
                            setSelectedMock({ ...mock, collectionId: collection.id });
                            setView('collection');
                          }}
                          className="text-left text-sm text-gray-300 hover:text-white"
                        >
                          {mockName}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      {/* Request-Response Section */}
      {/* <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">Request-Response</h3>
        <button
          onClick={() => {
            setSelectedMock(null);
            setView('request-response');
          }}
          className="w-full bg-gray-800 hover:bg-gray-700 text-left text-sm text-white px-3 py-2 rounded"
        >
          Open Request-Response
        </button>
      </div> */}

        {/* Bottom sticky section */}
      <div className="mt-auto border-t border-gray-700 pt-4 pb-6 px-4 text-sm text-gray-400">
        <a
          href="https://baraklabs.com/ditto/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-white mb-1"
        >
          Docs
        </a>
        <a href="https://baraklabs.com/contact-us" 
          target="_blank" className="block hover:text-white mb-1">
          Contact Us
        </a>
        <span className="text-xs text-gray-500">v1.0.0</span>
      </div>
    </div>
  );
};

export default MockSideNav;