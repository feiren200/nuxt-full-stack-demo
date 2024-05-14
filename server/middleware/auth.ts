import { checkPath } from '../utils'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'Authorization')?.split(' ')[1]
    const path = event._path
    const needCheckAuth = checkPath(path)
    if (needCheckAuth) {
      if (!token) {
        throw createError({ statusCode: 401, message: '请登录' })
      }
      const userInfo = verify(token)
      event.context.userInfo = userInfo
    }
  } catch (error) {
    throw createError(error as string)
  }
})
