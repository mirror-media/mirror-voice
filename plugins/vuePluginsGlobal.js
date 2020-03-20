import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import VueAB from './vue-a2b'

Vue.use(VueLazyload, {
  lazyComponent: true
})
Vue.use(VueAB, {
  storage: {
    method: 'cookie',
    isUniversal: false, // use cookie-universal for setting and getting cookie, avoid SSR issue
    name: 'mirror-voice-abtest',
    expiry: 7 * 2 // one week until the cookie expires
  }
})
