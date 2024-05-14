import JSEncrypt from 'jsencrypt'

const PUBLICKEY =
  '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDPQQ6Njd46Gpah/bccAsMOLIYKv31dVbc5coH9Qcy2GGSdS4NhxPrE3/c1hMC+GPNS/dUAAK6uzYOMPTtPL/Rk8bScbcbFBas4iB64kn0WX2KBujODhG/wAQunzxoKT/52NsOrq+R6ni1HUI6nX9W4NQWrxEga5z8rk8ySoXIpvwIDAQAB-----END PUBLIC KEY-----'

export const encryptPassword = (text: string) => {
  const encryptor = new JSEncrypt() // 创建加密对象实例
  encryptor.setPublicKey(PUBLICKEY) //设置公钥
  const rsaPassWord = encryptor.encrypt(text) // 对内容进行加密
  return rsaPassWord
}
