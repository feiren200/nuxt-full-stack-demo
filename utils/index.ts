export const regPhone = (phone: string): boolean => {
  return /^1[3-9]\d{9}$/.test(phone)
}
export const regEmail = (email: string): boolean => {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
}
