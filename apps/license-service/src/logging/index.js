import winston from 'winston'

// Create a logger with a console transport
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
})

export default logger
