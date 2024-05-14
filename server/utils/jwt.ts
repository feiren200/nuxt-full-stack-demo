import jwt from 'jsonwebtoken'

const secret =
  'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAM9BDo2N3joalqH9'

export const sign = (user: any) => {
  try {
    const token = jwt.sign(JSON.stringify(user), secret)
    return token
  } catch (error) {
    throw createError(error as string)
  }
}

export const verify = (token: string) => {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    console.log(error)
    throw createError(error as string)
  }
}
