import MAX_RESULTS from './maxResults'
import TTS_CONFIG from './ttsConfig'
import SECTION_CONFIG from './section'
import CATEGORY_CONFIG from './category'
import LOCAL_STORAGE_CONFIG from './localStorage'

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
  injectConstants(SECTION_CONFIG, inject)
  injectConstants(CATEGORY_CONFIG, inject)
  injectConstants(LOCAL_STORAGE_CONFIG, inject)
}
