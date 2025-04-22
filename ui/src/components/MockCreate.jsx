import React, { useState, useEffect } from 'react';
import { createMock } from '../services/mockService'; // Import the createMock service
import MessageBox from './MessageBox';

const MockCreate = ({ collections, selectedMock }) => {
  const [isFormView, setIsFormView] = useState(true);
  const [name, setName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [method, setMethod] = useState('GET');
  const [pathParam, setPathParam] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [mockType, setMockType] = useState('Default');
  const [requestHeader, setRequestHeader] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [responseHeader, setResponseHeader] = useState('');
  const [responseBody, setResponseBody] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (collections && collections.length > 0) {
      setSelectedCollection(collections[0].id);
    } else {
      setSelectedCollection('default');
    }
  }, [collections]);
  // ✅ Prepopulate form if a mock is selected
  useEffect(() => {
    console.log('selectedMock:', selectedMock);

    if (selectedMock) {
      setName(selectedMock.name || '');
      setSelectedCollection(selectedMock.collectionId || '');
      setMethod(selectedMock.req_method || 'GET');
      setPathParam(selectedMock.req_path_param || '');
      setResponseStatus(selectedMock.res_status || '');
      setPriority(selectedMock.priority || '');
      setMockType(selectedMock.mock_type || 'Default');
      setRequestHeader(selectedMock.req_header || '');
      setRequestBody(selectedMock.req_body || '');
      setResponseHeader(selectedMock.res_header ||'');
      setResponseBody(selectedMock.res_body || '');
    }
  }, [selectedMock]);

  const handleSave = async () => {
    const mockData = {
      name,
      collectionId: selectedCollection,
      method,
      pathParam,
      responseStatus,
      priority,
      mockType,
      requestHeader,
      requestBody,
      responseHeader,
      responseBody,
    };

    try {
      await createMock(mockData); // Call the createMock API
      setMessage({ type: 'success', text: 'Mock created successfully!' });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
    }
  };

  const handleUpdate = async () => {
    const mockData = {
      name,
      collectionId: selectedCollection,
      method,
      pathParam,
      responseStatus,
      priority,
      mockType,
      requestHeader,
      requestBody,
      responseHeader,
      responseBody,
    };

    try {
      await createMock(mockData); // Call the createMock API
      setMessage({ type: 'success', text: 'Mock created successfully!' });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">

      {message && (
        <MessageBox
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left: Title + Mock Name */}
        <div className="flex items-center space-x-4">
          {(!selectedMock || selectedMock.id === null) && (
            <h3 className="text-2xl font-bold mb-0">Create Mock</h3>
          )}
          <input
            type="text"
            placeholder="Mock Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded w-48"
          />
        </div>

        {/* Right: Collection Dropdown + Toggle Button */}
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-300 flex items-center space-x-2">
            <span>Collection Name</span>
            <select
              className="bg-gray-700 text-white px-3 py-2 rounded"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              {collections && collections.length > 0 ? (
                collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))
              ) : (
                <option value="default" disabled>
                  No collections available
                </option>
              )}
            </select>
          </label>

          <button
            className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => setIsFormView(!isFormView)}
          >
            {isFormView ? 'Switch to Free Text' : 'Switch to Form'}
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {isFormView ? (
        <div>
          {/* Form View */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Method</label>
              <select
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Path Param</label>
              <input
                type="text"
                value={pathParam}
                onChange={(e) => setPathParam(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Response Status</label>
              <input
                type="number"
                value={responseStatus}
                onChange={(e) => setResponseStatus(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Priority</label>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Mock Type</label>
              <select
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={mockType}
                onChange={(e) => setMockType(e.target.value)}
              >
                <option>Default</option>
                <option>Forward</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Request Header</label>
            <textarea
              value={requestHeader}
              onChange={(e) => setRequestHeader(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Request Body</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Response Header</label>
            <textarea
              value={responseHeader}
              onChange={(e) => setResponseHeader(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Response Body</label>
            <textarea
              value={responseBody}
              onChange={(e) => setResponseBody(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="4"
            />
          </div>
        </div>
      ) : (
        // Free Text View
        <div>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows="20"
            placeholder="Write free text mock API details here..."
          />
        </div>
      )}
      {selectedMock && selectedMock.id ? (
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          onClick={handleUpdate}
        > Update
        </button>) : (
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          onClick={handleSave}
        > Save
        </button>
      )}
    </div>
  );
};

export default MockCreate;
