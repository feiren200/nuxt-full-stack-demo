interface ResponseData {
  code?: number
  message?: string
}
export const createResponse = (
  data = {},
  responseData: ResponseData = { code: 200, message: 'ok' }
) => {
  const { code = 200, message = 'ok' } = responseData
  return code === 200 ? { code, data, message } : { code, message }
}
