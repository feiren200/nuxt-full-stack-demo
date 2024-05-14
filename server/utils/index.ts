const whiteList = ['/api/login']
const prefix = '/api'

export const checkPath = (path?: string) => {
  if (!path) return false
  if (!path.includes(prefix)) return false
  if (whiteList.includes(path)) return false
  return true
}
