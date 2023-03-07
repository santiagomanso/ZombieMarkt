import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import { sampleProducts } from './data/sampleProducts.js'
import { sampleUsers } from './data/sampleUsers.js'

import Product from './models/productModel.js'
import connectDB from './config/connectDB.js'
import userModel from './models/userModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await userModel.deleteMany()
    await Product.deleteMany()

    await userModel.insertMany(sampleUsers)
    await Product.insertMany(sampleProducts)
    console.log('Data imported!'.green.inverse)
    process.exit(1)
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await userModel.deleteMany()
    await Product.deleteMany()
    console.log('Data destroyed!'.red.inverse)
    process.exit(1)
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
