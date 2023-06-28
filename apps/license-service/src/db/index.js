import mongoose from 'mongoose'
import checkLicenses from './check-licenses.js'

async function connectToDb() {
  await mongoose.connect(
    'mongodb+srv://Cluster72424:THBnQlxYTGx9@cluster72424.nfsljvr.mongodb.net/licensify?appName=mongosh+1.10.1',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}

connectToDb().catch((error) => console.error(error))
checkLicenses()
