import sanitizeHtml from 'sanitize-html'

const sanitizeHtmlOptionsMain = {
  allowedTags: ['div', 'p', 'a', 'ol', 'li', 'strong', 'blockquote'],
  exclusiveFilter(frame) {
    return frame.tag === 'div' && frame.attribs.class === 'audio-container '
  }
}
const sanitizeHtmlOptionsAside = {
  allowedTags: ['div', 'p', 'a', 'strong'],
  exclusiveFilter(frame) {
    return frame.tag === 'div' && frame.attribs.class === 'audio-container '
  }
}

const sanitizeContent = (content, isContentAside = false) => {
  const option = isContentAside
    ? sanitizeHtmlOptionsAside
    : sanitizeHtmlOptionsMain
  const sanitized = sanitizeHtml(content, option)
  return isContentAside ? sanitized : sanitized.replace(/\n/g, '<br>')
}

export default sanitizeContent
