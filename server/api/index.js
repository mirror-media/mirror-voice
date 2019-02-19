const express = require('express')
const router = express.Router()

// const winston = require('winston')
// const expressWinston = require('express-winston')
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console()
//   ]
// })

// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

router.get('/', (req, res) => {
  // logger.info('Hello again distributed logs')
  throw new Error('BROKEN')
})

// router.use(expressWinston.errorLogger({
//   transports: [
//     new winston.transports.Console()
//   ],
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.json()
//   )
// }))

module.exports = router
