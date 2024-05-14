import type { FetchOptions } from 'ofetch'
interface RequestParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: AnyObject
  params?: AnyObject
}

interface AnyObject {
  [key: string]: any
}

interface HttpOptions extends FetchOptions {
  showErrorMessage: boolean
}

export const http = <T = any>(
  url: string,
  requestParams: RequestParams = {},
  options: HttpOptions = { retry: 0, showErrorMessage: true }
): Promise<{ code: number; message: string; data: T }> => {
  const { method = 'GET', data, params } = requestParams
  const headers = {} as { Authorization: string }
  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return $fetch(url, {
    ...options,
    method,
    body: data,
    params,
    headers,
    onResponse: ({ response }) => {
      // 302处理
      if (response.redirected) {
        window.location.href = response.url
        // 直接写入html
        // document.write(response.response._data)
      }
      if (
        response.ok &&
        response.status === 200 &&
        response.statusText === 'OK'
      ) {
        response._data.message !== 'ok' &&
          ElMessage.success(response._data.message)
      }
    },
    onResponseError: ({ response }) => {
      options.showErrorMessage && ElMessage.error(response._data.message)
      throw new Error(response._data.message)
      // console.log(response.response._data)
    },
  })
}
