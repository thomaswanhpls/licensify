import License from '../db/license.js'

export const typeDefs = `#graphql
  type Query {
    licenses: [License]
    myLicense: License
  }

  type Mutation {
    addLicense(number: String!): License
    rentLicense: License
  }

  type License {
    id: ID!
    number: String!
    available: Boolean!
    rentedAt: String
    owner: String
  }
`

export const resolvers = {
  Query: {
    licenses: async () => {
      const licenses = await License.find().exec()
      return licenses || []
    },
    myLicense: async (_, __, { session }) => {
      const license = await License.findOne({ owner: session?.id }).exec()
      return license
    },
  },
  Mutation: {
    rentLicense: async (_, __, { session }) => {
      console.log(session.id)
      const sessionHasLicense = await License.findOne({ owner: session?.id })
      console.log(sessionHasLicense)
      if (sessionHasLicense) return null
      const license = await License.findOneAndUpdate(
        { available: true },
        { available: false, rentedAt: new Date(), owner: session?.id }
      ).exec()
      return license
    },
    addLicense: async (_, { number }) => {
      const result = await License.create({ number, available: true })
      console.log(result)
      const license = { id: result._id, number, available: true }
      return license
    },
  },
}
