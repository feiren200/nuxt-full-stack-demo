import JSEncrypt from 'node-rsa'
import md5 from 'md5'
const PRIVATEKEY =
  '-----BEGIN PRIVATE KEY-----MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAM9BDo2N3joalqH9txwCww4shgq/fV1Vtzlygf1BzLYYZJ1Lg2HE+sTf9zWEwL4Y81L91QAArq7Ng4w9O08v9GTxtJxtxsUFqziIHriSfRZfYoG6M4OEb/ABC6fPGgpP/nY2w6ur5HqeLUdQjqdf1bg1BavESBrnPyuTzJKhcim/AgMBAAECgYAlUCollBAZV+Ycvgf0dA7YA24Si00vu5nkLth2Vx1a/2NF6m158bPQNB5WtVLaJrXQEEED4huQ/xEa8381D4YpP0+FGMvszt94SAknJUGmtUcXlNN4tyrR7OzVmbXza7uRat7J2c4RFhgoe+QO6Q+QvLI+4MqcE041GO5B6KptUQJBAPE5DfI6YKy0drA3bmEQxesF8wlGIxS/VEpfgOW12a1vBpzdXVlhEfLKekr5t3cyMmjKv/5M27wT39g3MXPc8AcCQQDb80rIKL9Tjiztdeubp6JL1hsMmEq/U7jx0rIbMfWKN37o2YLLPGBE80RaVthomIxo3AHF59/bTBezcIUyQxqJAkEA0D1wzKuYyX8A9x7jKuhP85QvOtJRdpe1LH9Fxwg14oL2MnTnIUGrPO2OpSruNvgejFh7ZgzzpGmD1CPRjTQuAQJANdUN8H9IlIKvrE64I5ibuEPmyuZbJQiwsz8GKHHJztJWVVcnE+brCPUhPZsTzEXJ18BBDtb5iwrMojZf4zVZQQJBAKokAOkUMVDLZGKBPIISNCLq2Do1c/hQFdM3GZRnPXoEW+i2Ww5uCcG6rPcLUg4ahzq0N/BFM7lIX6d/vcfOp74=-----END PRIVATE KEY-----'

export const decryptPassword = (text: string) => {
  const decrypt = new JSEncrypt(PRIVATEKEY) // 创建加密对象实例
  decrypt.setOptions({ encryptionScheme: 'pkcs1' })
  const uncrypted = decrypt.decrypt(text, 'utf8') //解密之前拿公钥加密的内容
  return { text: uncrypted, md5: md5(uncrypted) }
}
