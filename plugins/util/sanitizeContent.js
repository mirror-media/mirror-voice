import sanitizeHtml from 'sanitize-html'

const sanitizeHtmlOptions = {
  allowedTags: ['div', 'p', 'a', 'ol', 'li', 'strong', 'blockquote'],
  exclusiveFilter(frame) {
    return frame.tag === 'div' && frame.attribs.class === 'audio-container '
  }
}

const sanitizeContent = content => {
  return sanitizeHtml(content, sanitizeHtmlOptions).replace(/\n/g, '<br>')
}

export default sanitizeContent
