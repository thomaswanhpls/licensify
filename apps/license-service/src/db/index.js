/* eslint-disable turbo/no-undeclared-env-vars */
import mongoose from 'mongoose'
import checkLicenses from './check-licenses.js'
import dotenv from 'dotenv'

dotenv.config()
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } =
  process.env

async function connectToDb() {
  await mongoose.connect(
    `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?appName=mongosh+1.10.1`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}

connectToDb().catch((error) => console.error(error))
checkLicenses()
