const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')
const useragent = require('express-useragent')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const { messageLogger, errorLogger } = require('./logger/middle')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // https://nuxtjs.org/api/configuration-server#the-server-property
  // https://nuxtjs.org/faq/host-port/
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Request Logging
  app.use([messageLogger])

  // API
  app.use('/api', require('./api'))

  app.use(useragent.express())

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Error Logging
  app.use(errorLogger)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

app.use(bodyParser.json())
app.use(compression({ threshold: 0 }))

start()
