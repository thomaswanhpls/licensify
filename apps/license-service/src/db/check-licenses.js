import License from './license.js'
import log from '../logging/index.js'

function hasExpired(license) {
  const seconds = 15
  const now = new Date()
  const then = now - seconds * 1000

  return license.rentedAt < then
}

function checkLicenses() {
  setInterval(async () => {
    const licenses = (await License.find({ available: false }).exec()) || []

    if (licenses.length < 1) return

    licenses.filter(hasExpired).forEach(async (license) => {
      await License.findOneAndUpdate(
        { _id: license._id },
        { available: true, owner: null }
      )
      log.info(`[${Date.now()}]: License ${license.number} is available.`)
    })
  }, 1000)
}

export default checkLicenses
