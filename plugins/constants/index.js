import SANITIZE_HTML_DEFAULT_OPTIONS from './sanitizeHtml'

export default (context, inject) => {
  inject('SANITIZE_HTML_DEFAULT_OPTIONS', SANITIZE_HTML_DEFAULT_OPTIONS)
}
