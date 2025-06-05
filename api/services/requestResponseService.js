const RequestResponseModel = require('../models/requestResponseModel');

const RequestResponseService = {

  // Get request-response entries by userId with pagination
  listAllByUserId: async (userId, dayOffset, offset = 0, limit = 10) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - dayOffset);

    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);

    const items = await RequestResponseModel.getByUserIdAndDay(
      userId,
      startOfDay,
      endOfDay,
      offset,
      limit + 1 // fetch one extra to detect if more exists
    );

    const hasMore = items.length > limit;
    if (hasMore) items.pop(); // remove extra item

    return { items, hasMore };
  },
  log: (req, cleanReq, res, selected) => {
    let responseBody = '';

    const originalSend = res.send;
    res.send = function (body) {
      responseBody = body;
      return originalSend.call(this, body);
    };

    res.on('finish', async () => {
      try {
        const userId = selected.user_id || null;
        const mockId = selected.id || null;
        const host = req.headers['host'] || null;

        const data = {
          req_path_param: cleanReq.req_path_param || '',
          req_method: cleanReq.req_method,
          req_header: JSON.stringify(cleanReq.req_header || {}),
          req_body: typeof cleanReq.req_body === 'string' ? cleanReq.req_body : JSON.stringify(cleanReq.req_body || {}),
          req_query_param: JSON.stringify(cleanReq.req_query_param || {}),
          res_status: res.statusCode,
          res_header: JSON.stringify(res.getHeaders()),
          res_body: typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody),
          cookies: JSON.stringify(res.getHeader('set-cookie') || []),
          host,
          user_id: userId,
          mock_id: mockId,
        };

        await RequestResponseModel.create(data);

      } catch (err) {
        console.error('Failed to log request-response:', err);
      }
    });
  }


}

module.exports = RequestResponseService;
