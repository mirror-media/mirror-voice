import MAX_RESULTS from './maxResults'
import TTS_CONFIG from './ttsConfig'

const injectConstants = (constants, inject) => {
  Object.entries(constants).forEach(pair => {
    const key = pair[0]
    const value = pair[1]
    inject(key, value)
  })
}

export default (context, inject) => {
  inject('MAIL', 'voiceservice@mirrormedia.mg')
  injectConstants(MAX_RESULTS, inject)
  injectConstants(TTS_CONFIG, inject)
}
