const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const pkg = require('./package')
const zhTW = require('./i18n/zh-tw')

module.exports = {
  mode: 'universal',

  server: {
    port: process.env.NODE_ENV === 'production' ? 80 : 8080,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/css/normalize.css',
    '~/css/default.css',
    'swiper/dist/css/swiper.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fetch.js',
    '~/plugins/vuePlugins.js',
    '~/plugins/util/index.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'zh-tw',
            iso: 'zh-tw'
          }
        ],
        defaultLocale: 'zh-tw',
        vueI18n: {
          fallbackLocale: 'zh-tw',
          messages: {
            'zh-tw': zhTW
          }
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1',
    port: process.env.NODE_ENV === 'production' ? 80 : 8080
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // lodash-webpack-plugin
      config.plugins.push(new LodashModuleReplacementPlugin({ paths: true }))
    },
    babel: {
      plugins: ['@babel/plugin-syntax-dynamic-import', 'lodash'],
      presets: [['@babel/env', { targets: { node: 6 } }]]
    }
  }
}
