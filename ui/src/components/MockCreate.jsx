import React, { useState, useEffect } from 'react';
import { createMock } from '../services/mockService';
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
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [schema, setSchema] = useState('http');
  const [freeText, setFreeText] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (collections && collections.length > 0) {
      setSelectedCollection(collections[0].id);
    } else {
      setSelectedCollection('default');
    }
  }, [collections]);

  useEffect(() => {
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
      setResponseHeader(selectedMock.res_header || '');
      setResponseBody(selectedMock.res_body || '');
      setHost(selectedMock.host || '');
      setPort(selectedMock.port || '');
      setSchema(selectedMock.schema || 'http');

      // Also update free text
      const mockData = {
        name: selectedMock.name || '',
        collectionId: selectedMock.collectionId || '',
        method: selectedMock.req_method || 'GET',
        pathParam: selectedMock.req_path_param || '',
        responseStatus: selectedMock.res_status || '',
        priority: selectedMock.priority || '',
        mockType: selectedMock.mock_type || 'Default',
        requestHeader: selectedMock.req_header || '',
        requestBody: selectedMock.req_body || '',
        responseHeader: selectedMock.res_header || '',
        responseBody: selectedMock.res_body || '',
        host: selectedMock.host || '',
        port: selectedMock.port || '',
        schema: selectedMock.schema || 'http',
      };
      setFreeText(JSON.stringify(mockData, null, 2));
    }
  }, [selectedMock]);

  const handleSaveOrUpdate = async () => {
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
      host,
      port,
      schema,
    };

    try {
      await createMock(mockData);
      setMessage({ type: 'success', text: 'Mock saved successfully!' });
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleToggleView = () => {
    if (isFormView) {
      // Form to Free Text
      const data = {
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
        host,
        port,
        schema,
      };
      setFreeText(JSON.stringify(data, null, 2));
    } else {
      // Free Text to Form
      try {
        const parsed = JSON.parse(freeText);
        setName(parsed.name || '');
        setSelectedCollection(parsed.collectionId || '');
        setMethod(parsed.method || 'GET');
        setPathParam(parsed.pathParam || '');
        setResponseStatus(parsed.responseStatus || '');
        setPriority(parsed.priority || '');
        setMockType(parsed.mockType || 'Default');
        setRequestHeader(parsed.requestHeader || '');
        setRequestBody(parsed.requestBody || '');
        setResponseHeader(parsed.responseHeader || '');
        setResponseBody(parsed.responseBody || '');
        setHost(parsed.host || '');
        setPort(parsed.port || '');
        setSchema(parsed.schema || 'http');
      } catch (err) {
        setMessage({ type: 'error', text: 'Invalid JSON format in Free Text view' });
        return;
      }
    }
    setIsFormView(!isFormView);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
      {message && (
        <MessageBox
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {!selectedMock?.id && <h3 className="text-2xl font-bold mb-0">Create Mock</h3>}
          <input
            type="text"
            placeholder="Mock Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded w-48"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-300 flex items-center space-x-2">
            <span>Collection Name</span>
            <select
              className="bg-gray-700 text-white px-3 py-2 rounded"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              {collections.length > 0 ? (
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
            onClick={handleToggleView}
          >
            {isFormView ? 'Switch to Free Text' : 'Switch to Form'}
          </button>
        </div>
      </div>

      {isFormView ? (
        <>
          <div className="grid grid-cols-2 gap-4">
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

          {mockType === 'Forward' && (
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-200">Forward Settings</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Host</label>
                  <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Port</label>
                  <input
                    type="text"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Schema</label>
                  <select
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    value={schema}
                    onChange={(e) => setSchema(e.target.value)}
                  >
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Request and Response */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-200">📝 Request</h4>
            <div className="grid grid-cols-4 gap-4">
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
              <div className="col-span-3">
                <label className="block text-sm mb-1">Path Param</label>
                <input
                  type="text"
                  value={pathParam}
                  onChange={(e) => setPathParam(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
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
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-200">🎯 Response</h4>
            {mockType === 'Forward' ? (
              <div className="text-gray-300">
                Response forwarded from <strong>{`${schema}://${host}:${port}`}</strong>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </>
      ) : (
        <div>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows="20"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder="Write free text mock API details here..."
          />
        </div>
      )}

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
        onClick={handleSaveOrUpdate}
      >
        {selectedMock?.id ? 'Update' : 'Save'}
      </button>
    </div>
  );
};

export default MockCreate;
