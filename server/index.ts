import mongoose from 'mongoose'

export default async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/nuxt_app')
    console.log('DB connection established')
  } catch (err) {
    console.error('DB connection failed', err)
  }
}
