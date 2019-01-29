const pkg = require('./package')
const zhTW = require('./i18n/zh-tw')

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  mode: 'universal',

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
    '~/css/normalize.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      locales: ['zh-tw'],
      defaultLocale: 'zh-tw',
      vueI18n: {
        fallbackLocale: 'zh-tw',
        messages: {
          'zh-tw': zhTW,
        }
      }
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
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
      config.plugins.push(new LodashModuleReplacementPlugin)
    },
    babel: {
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        'lodash'
      ],
      presets: [['@babel/env', { 'targets': { 'node': 6 } }]]
    }
  }
}
