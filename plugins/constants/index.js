import SANITIZE_HTML_DEFAULT_OPTIONS from './sanitizeHtml'
import * as MAX_RESULTS from './maxResults'

export default (context, inject) => {
  inject('SANITIZE_HTML_DEFAULT_OPTIONS', SANITIZE_HTML_DEFAULT_OPTIONS)
  Object.entries(MAX_RESULTS).forEach(pair => {
    const key = pair[0]
    const value = pair[1]
    inject(key, value)
  })
  inject('MAIL', 'voiceservice@mirrormedia.mg')
}
