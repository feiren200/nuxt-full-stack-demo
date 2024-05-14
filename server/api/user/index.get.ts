export default defineEventHandler(async (event) => {
  try {
    return createResponse(event.context.userInfo, { message: '查询成功' })
  } catch (error) {
    throw createError(error as string)
  }
})
