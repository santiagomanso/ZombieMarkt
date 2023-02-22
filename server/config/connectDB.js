import mongoose from 'mongoose'
const connectDB = async () => {
  const PORT = process.env.PORT || 5000
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(process.env.DB)
    console.log(
      `Connection to MongoDB established on port: ${PORT}`.bgBrightGreen,
    )
  } catch (error) {
    console.log(
      `Error while trying to connect to MongoDB, error: ${error}`.bgBrightRed,
    )
    process.exit(1)
  }
}

export default connectDB
