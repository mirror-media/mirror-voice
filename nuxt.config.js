const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const zhTW = require('./i18n/zh-tw')
const {
  SERVER_PROTOCOL,
  SERVER_HOST,
  SERVER_PORT,
  GOOGLE_RECAPTCHA_SITE_KEY
} = require('./server/config')

const isProd = process.env.NODE_ENV === 'production'
const baseURL = isProd
  ? `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`
  : `http://localhost:8080`

module.exports = {
  mode: 'universal',

  server: {
    host: isProd ? '0.0.0.0' : '127.0.0.1',
    port: isProd ? '80' : 8080
  },

  // TODO: we could refactor this
  /*
  ** Headers of the page
  */
  head: {
    title: '鏡好聽 Mirror Voice',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '鏡好聽是一個以台灣為基地、放眼國際的語音內容平台，集結名家精選、百工職人、生活文化、獨家內幕、專欄評析、小說劇本等知識暨文學型聲音節目，以多媒體形式，將文字播種，使眾聲思潮得以綻放。'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: '鏡好聽 Mirror Voice'
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'zh_TW'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '鏡好聽 Mirror Voice'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '鏡好聽是一個以台灣為基地、放眼國際的語音內容平台，集結名家精選、百工職人、生活文化、獨家內幕、專欄評析、小說劇本等知識暨文學型聲音節目，以多媒體形式，將文字播種，使眾聲思潮得以綻放。'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://voice.mirrorfiction.com'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://voice.mirrorfiction.com/ogImg/release.jpg'
      }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon_revamp.ico' }],
    script: [{ src: '/scripts/comscore.js' }]
  },

  router: {
    middleware: ['ua']
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
    '~/css/animate.css',
    'swiper/dist/css/swiper.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuePlugins.js',
    '~/plugins/util/index.js',
    '~/plugins/constants/index.js',
    '~/plugins/requests/index.js',
    '~/plugins/meta/index.js',
    '~/plugins/ga/index.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    // '@nuxtjs/pwa',
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
    ],
    [
      '@nuxtjs/recaptcha',
      {
        siteKey: GOOGLE_RECAPTCHA_SITE_KEY,
        version: 2
      }
    ],
    'nuxt-vuex-localstorage'
  ],

  /*
  ** googleAnalytics module configuration
  ** https://github.com/nuxt-community/analytics-module
  */
  googleAnalytics: {
    id: 'UA-83609754-1',
    debug: {
      sendHitTask: isProd
    }
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL
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
