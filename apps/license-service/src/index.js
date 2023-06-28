import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import https from 'https'
import fs from 'fs'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import crypto from 'crypto'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'
import './db/index.js'
import { typeDefs, resolvers } from './graphql/schema.js'

// Required logic for integrating with Express
const app = express()
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
}
const httpsServer = https.createServer(options, app)

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpsServer })],
})
// Ensure we wait for our server to start
await server.start()

// Initialize client.
const redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
})

// Setup session
app.use(cookieParser())
app.use(
  session({
    store: redisStore,
    secret: 'licensify',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      sameSite: false, // Can be set to strict, lax (recommended) or false
    },
  })
)

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors({ credentials: true, origin: true }),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token,
      session: req.session,
    }),
  })
)

// Modified server startup
await new Promise((resolve) => httpsServer.listen({ port: 4000 }, resolve))

console.log(`🚀 Server ready at http://localhost:4000/`)
