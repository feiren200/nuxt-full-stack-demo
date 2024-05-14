import mongoose from 'mongoose'
export interface IUser {
  username: string
  phone: string
  password: string
  email?: string
  avatar?: string
}
// 建立 Schema
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v: string): boolean => {
        return /^1[3-9]\d{9}$/.test(v)
      },
      message: '{VALUE} is not a valid phone number!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
  avatar: String,
})

// 建立 Model
const User = mongoose.model('User', userSchema)

export default User
