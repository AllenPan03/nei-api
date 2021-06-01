/**
 * __api_annotation__
 * @param {Object} params Request Params
 * @param {Object} options Request Config 
 */
export async function __api_name__(params = {}, options) {
  return request.__method__({
    url: __url__,
    data: params,
    ...options
  });
}
