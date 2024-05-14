import User, { IUser } from '~/server/models/userModel'
import { decryptPassword } from '~/server/utils/decryptPassword'
import { sign } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as IUser
    const findUser = await User.findOne({ username: body.username })
      .lean()
      .exec()
    if (!findUser) throw createError('用户不存在')
    if (findUser.password !== decryptPassword(body.password).md5)
      throw createError('密码错误')
    const token = sign(findUser)
    findUser.token = token
    return createResponse(findUser, { message: '登陆成功' })
  } catch (error) {
    throw createError(error as string)
  }
})
