import SANITIZE_HTML_DEFAULT_OPTIONS from './sanitizeHtml'
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
  inject('SANITIZE_HTML_DEFAULT_OPTIONS', SANITIZE_HTML_DEFAULT_OPTIONS)
  inject('MAIL', 'voiceservice@mirrormedia.mg')
  injectConstants(MAX_RESULTS, inject)
  injectConstants(TTS_CONFIG, inject)
}
