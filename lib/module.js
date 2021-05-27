__api_annotation__
export async function __api_name__(params = {}) {
  return request.__method__({
    url: __url__,
    data: params,
  });
}
