const TOKEN_KEY = 'token'

export const getToken = () => window.localStorage.getItem(TOKEN_KEY)

export const setToken = (token: string) =>
  window.localStorage.setItem(TOKEN_KEY, token)

export const removeToken = () => window.localStorage.removeItem(TOKEN_KEY)
