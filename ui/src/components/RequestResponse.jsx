import React, { useEffect, useState } from 'react';
import { getRequestResponses } from '../services/requestResponseService';

const dayLabelToOffset = {
  Today: 0,
  Yesterday: 1,
  'Day 3': 2,
  'Day 4': 3,
  'Day 5': 4,
  'Day 6': 5,
  'Day 7': 6,
};

const RequestResponse = () => {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async (dayOffset, pageNumber = 1) => {
    setLoading(true);
    try {
      const result = await getRequestResponses(dayOffset, pageNumber);
      if (pageNumber === 1) {
        setData(result.data);
      } else {
        setData((prev) => [...prev, ...result.data]);
      }
      setHasMore(result.hasMore);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const offset = dayLabelToOffset[selectedDay];
    setPage(1);
    fetchLogs(offset, 1);
  }, [selectedDay]);

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchLogs(dayLabelToOffset[selectedDay], nextPage);
  };

  return (
    <div className="p-6 text-white w-full">
      <h2 className="text-xl font-semibold mb-4">Request-Response Logs</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.keys(dayLabelToOffset).map((label) => (
          <button
            key={label}
            onClick={() => setSelectedDay(label)}
            className={`px-3 py-1 rounded ${
              selectedDay === label ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400">No data found for {selectedDay}.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-700 table-auto">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-2 border-b border-gray-700">Host</th>
                <th className="p-2 border-b border-gray-700">Path Param</th>
                <th className="p-2 border-b border-gray-700">Query</th>
                <th className="p-2 border-b border-gray-700">Body</th>
                <th className="p-2 border-b border-gray-700">Response</th>
                <th className="p-2 border-b border-gray-700">Method</th>
                <th className="p-2 border-b border-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="p-2">{item.host}</td>
                  <td className="p-2 whitespace-nowrap">{item.req_path_param}</td>
                  <td className="p-2">
                    <pre className="whitespace-pre-wrap break-words">{item.req_query_param}</pre>
                  </td>
                  <td className="p-2">
                    <pre className="whitespace-pre-wrap break-words">{item.req_body}</pre>
                  </td>
                  <td className="p-2">
                    <pre className="whitespace-pre-wrap break-words">{item.res_body}</pre>
                  </td>
                  <td className="p-2">{item.req_method}</td>
                  <td className="p-2">{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {hasMore && (
        <div className="mt-4">
          <button
            onClick={handleNext}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestResponse;
