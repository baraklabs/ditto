import React, { useState, useEffect } from 'react';
import { createMock, updateMock, deleteMock } from '../services/mockService';
import MessageBox from './MessageBox';
import { getApiBaseUrl } from "../utils/getApiBaseUrl";
import { Trash2 } from 'lucide-react';

const MockCreate = ({ collections, selectedMock, refreshCollections, setExpanded }) => {
  const [isFormView, setIsFormView] = useState(true);
  const [name, setName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [method, setMethod] = useState('GET');
  const [pathParam, setPathParam] = useState('');
  const [queryParam, setQueryParam] = useState('');
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
  const [showCurl, setShowCurl] = useState(false);

  useEffect(() => {
    if (collections && collections.length > 0) {
      setSelectedCollection(collections[0].id);
    } else {
      setSelectedCollection('default');
    }
  }, [collections]);
  const [showCurlPreview, setShowCurlPreview] = useState(false);

  const buildCurlCommand = () => {
    const baseUrl = getApiBaseUrl(schema, host, port);
    const fullUrl = `${baseUrl}${pathParam}${queryParam ? `?${queryParam}` : ''}`;
    const headers = requestHeader
      .split('\n')
      .filter(Boolean)
      .map((line) => `-H "${line.trim()}"`)
      .join(' ');
    const bodyPart = method !== 'GET' && requestBody
      ? `-d '${requestBody}'`
      : '';
    return `curl -X ${method} "${fullUrl}" ${headers} ${bodyPart}`.trim();
  };


  useEffect(() => {
    if (selectedMock) {
      setName(selectedMock.name || '');
      setSelectedCollection(selectedMock.collectionId || '');
      setMethod(selectedMock.req_method || 'GET');
      setPathParam(selectedMock.req_path_param || '');
      setQueryParam(selectedMock.req_query_param || '');
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

      const mockData = {
        name: selectedMock.name || '',
        collectionId: selectedMock.collectionId || '',
        method: selectedMock.req_method || 'GET',
        pathParam: selectedMock.req_path_param || '',
        queryParam: selectedMock.req_query_param || '',
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
      queryParam,
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
      if (selectedMock?.id) {
        await updateMock(selectedMock.id, mockData);
        setMessage({ type: 'success', text: 'Mock updated successfully!' });
      } else {
        await createMock(mockData);
        setMessage({ type: 'success', text: 'Mock saved successfully!' });
      }
      await refreshCollections();

      setTimeout(() => setMessage(null), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };
  const handleDelete = async () => {
    if (!selectedMock?.id) return;

    const confirmed = window.confirm('Are you sure you want to delete this mock?');
    if (!confirmed) return;

    try {
      await deleteMock(selectedMock.id);
      setMessage({ type: 'success', text: 'Mock deleted successfully!' });
      await refreshCollections();
      setExpanded(null); // collapse view or reset state
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleToggleView = () => {
    if (isFormView) {
      const data = {
        name, collectionId: selectedCollection, method, pathParam, queryParam,
        responseStatus, priority, mockType, requestHeader, requestBody,
        responseHeader, responseBody, host, port, schema
      };
      setFreeText(JSON.stringify(data, null, 2));
    } else {
      try {
        const parsed = JSON.parse(freeText);
        setName(parsed.name || '');
        setSelectedCollection(parsed.collectionId || '');
        setMethod(parsed.method || 'GET');
        setPathParam(parsed.pathParam || '');
        setQueryParam(parsed.queryParam || '');
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

  const previewUrl = `${schema}://${host || 'your-host'}:${port || 'port'}${pathParam || ''}${queryParam ? `?${queryParam}` : ''}`;

  const constructCurl = () => {
    const curlParts = [
      `curl -X ${method} "${previewUrl}"`,
      requestHeader ? `-H "${requestHeader.replace(/\n/g, '" -H "')}"` : '',
      requestBody ? `-d '${requestBody}'` : ''
    ];
    return curlParts.filter(Boolean).join(' \\\n  ');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
      {message && <MessageBox type={message.type} message={message.text} onClose={() => setMessage(null)} />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {!selectedMock?.id && <h3 className="text-2xl font-bold mb-0">Create Mock</h3>}
          {isFormView && (
            <input
              type="text"
              placeholder="Mock Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded w-48"
            />
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isFormView && (
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
                  <option value="default" disabled>No collections available</option>
                )}
              </select>
            </label>
          )}
          <button
            className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleToggleView}
          >
            {isFormView ? 'Switch to Free Text' : 'Switch to Form'}
          </button>
        </div>
      </div>

      {/* Form View */}
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
                <input value={host} onChange={(e) => setHost(e.target.value)} className="p-2 bg-gray-700 text-white rounded" placeholder="Host" />
                <input value={port} onChange={(e) => setPort(e.target.value)} className="p-2 bg-gray-700 text-white rounded" placeholder="Port" />
                <select value={schema} onChange={(e) => setSchema(e.target.value)} className="p-2 bg-gray-700 text-white rounded">
                  <option value="http">HTTP</option>
                  <option value="https">HTTPS</option>
                </select>
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-200">📝 Request</h4>
            <div className="grid grid-cols-8 gap-4">
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="col-span-1 p-2 bg-gray-700 text-white rounded">
                <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
              </select>
              <input
                type="text"
                value={pathParam}
                onChange={(e) => setPathParam(e.target.value)}
                className="col-span-3 p-2 bg-gray-700 text-white rounded"
                placeholder="/api/path"
              />
              <input
                type="text"
                value={queryParam}
                onChange={(e) => setQueryParam(e.target.value)}
                className="col-span-4 p-2 bg-gray-700 text-white rounded"
                placeholder="query=example"
              />
            </div>
            <textarea value={requestHeader} onChange={(e) => setRequestHeader(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white mt-2" rows="2" placeholder="Request Header" />
            <textarea value={requestBody} onChange={(e) => setRequestBody(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white mt-2" rows="2" placeholder="Request Body" />
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-lg font-semibold mb-2 text-gray-200">🎯 Response</h4>
            {mockType === 'Forward' ? (
              <div className="text-gray-300">Response forwarded from <strong>{`${schema}://${host}:${port}`}</strong></div>
            ) : (
              <>
                <input type="number" value={responseStatus} onChange={(e) => setResponseStatus(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" placeholder="Response Status" />
                <textarea value={responseHeader} onChange={(e) => setResponseHeader(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white mt-2" rows="2" placeholder="Response Header" />
                <textarea value={responseBody} onChange={(e) => setResponseBody(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white mt-2" rows="4" placeholder="Response Body" />
              </>
            )}
          </div>
        </>
      ) : (
        <textarea
          className="w-full p-2 rounded bg-gray-700 text-white"
          rows="20"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          placeholder="Write free text mock API details here..."
        />
      )}

      {/* Preview Section */}
      <div className="border-t border-gray-700 pt-4 space-y-2">
        <h4 className="text-lg font-semibold text-gray-200">🔍 Preview</h4>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">
            {`${getApiBaseUrl(schema, host, port)}${pathParam}${queryParam ? `?${queryParam}` : ''}`}
          </span>

          <button
            className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-500"
            onClick={() => setShowCurlPreview(!showCurlPreview)}
          >
            {showCurlPreview ? 'Hide cURL' : 'Show cURL'}
          </button>
        </div>

        {showCurlPreview && (
          <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded relative">
            <pre>{buildCurlCommand()}</pre>
            <button
              className="absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
              onClick={() => navigator.clipboard.writeText(buildCurlCommand())}
            >
              📋 Copy
            </button>
          </div>
        )}
      </div>


      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          onClick={handleSaveOrUpdate}
        >
          {selectedMock?.id ? 'Update Mock' : 'Create Mock'}
        </button>

        {selectedMock?.id && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-2 ml-auto"
            title="Delete Mock"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>


    </div>
  );
};

export default MockCreate;
