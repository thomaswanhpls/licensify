import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const licenseSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  owner: { type: String, default: null },
  available: { type: Boolean, default: true },
  rentedAt: { type: Date, default: null },
})

licenseSchema.plugin(uniqueValidator)

const License = mongoose.model('License', licenseSchema)

export default License
