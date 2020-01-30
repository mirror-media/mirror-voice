import sanitizeHtml from 'sanitize-html'

const sanitizeHtmlOptions = {
  main: {
    allowedTags: ['div', 'p', 'a', 'ol', 'li', 'strong', 'blockquote'],
    exclusiveFilter(frame) {
      return frame.tag === 'div' && frame.attribs.class === 'audio-container '
    }
  },
  aside: {
    allowedTags: ['div', 'p', 'a', 'strong'],
    exclusiveFilter(frame) {
      return frame.tag === 'div' && frame.attribs.class === 'audio-container '
    }
  },
  categoriesShowcase: {
    allowedTags: []
  }
}

const sanitizeContent = (content, type = 'main') => {
  const option = sanitizeHtmlOptions[type]
  const sanitized = sanitizeHtml(content, option)
  return type === 'aside' ? sanitized : sanitized.replace(/\n/g, '<br>')
}

export default sanitizeContent
