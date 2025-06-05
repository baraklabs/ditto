const { cleanHeaders, cleanQueryParams, cleanBody } = require("./clean");
const { getContentTypeFromHeader } = require("./httpHelpers");


function cleanData(rawData) {
    let result = rawData;
    result.requestHeader = cleanHeaders(rawData.requestHeader)
    result.queryParam = cleanQueryParams(rawData.queryParam)
    const reqContentType = getContentTypeFromHeader(result.requestHeader);
    result.requestBody = cleanBody(rawData.requestBody, reqContentType)

    result.responseHeader = cleanHeaders(rawData.responseHeader)
    const resContentType = getContentTypeFromHeader(result.responseHeader);
    result.responseBody = cleanBody(rawData.responseBody, resContentType)


    return result;

}



module.exports = {
    cleanData,
    getContentTypeFromHeader
};
