export default {
  allowedTags: ['div', 'p', 'a', 'ol', 'li', 'strong', 'blockquote'],
  exclusiveFilter(frame) {
    return frame.tag === 'div' && frame.attribs.class === 'audio-container '
  }
}
