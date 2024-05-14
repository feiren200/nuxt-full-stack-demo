export default defineEventHandler(async (event) => {
  console.log(new Date())
  try {
    console.log(a.b)
    return createResponse({
      hello: 'error',
    })
  } catch (error) {
    console.log(error)
    throw createError(error)
  }
})
