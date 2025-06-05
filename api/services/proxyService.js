const axios = require('axios');
const { deNormalizeHeaders } = require("../utils/normalize");

async function callProxyHost(selected, cleanedReq) {
  const {
    host,
    port,
    schema,
    req_method,
  } = selected;

  const {
    req_path_param,
    req_header,
    req_body,
    req_query_param

  } = cleanedReq;

  const url = `${schema}://${host}${port ? `:${port}` : ''}${req_path_param || '/'}`;

  try {
    const headers = req_header ? deNormalizeHeaders(req_header) : {};
    const params = req_query_param ? JSON.parse(req_query_param) : {};

    const response = await axios({
      method: req_method?.toLowerCase() || 'get',
      url,
      headers,
      params,
      data: req_body ? (typeof req_body === 'string' ? JSON.parse(req_body) : req_body) : undefined,
      validateStatus: () => true
    });
    return {
      status: response.status,
      headers: response.headers,
      data: response.data
    };
  } catch (error) {
    console.error('Proxy error:', error.message);
    return {
      status: 502,
      headers: {},
      data: { error: 'Proxy request failed', message: error.message }
    };
  }
}

module.exports = { callProxyHost };
