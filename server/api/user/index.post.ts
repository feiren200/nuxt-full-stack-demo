import User, { IUser } from '~/server/models/userModel'
import { decryptPassword } from '~/server/utils/decryptPassword'

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as IUser
    const findUser = await User.findOne({
      $or: [{ username: body.username }, { phone: body.phone }],
    }).exec()
    if (findUser) throw createError('用户名或电话已存在！')
    body.password = decryptPassword(body.password).md5
    const res = await User.create(body)
    console.log(res)
    return createResponse({ userInfo: res }, { message: '创建成功' })
  } catch (error) {
    throw createError(error as string)
  }
})
