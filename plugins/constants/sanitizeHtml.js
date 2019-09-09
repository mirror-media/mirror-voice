export default {
  allowedTags: ['div', 'p', 'a', 'ol', 'li'],
  exclusiveFilter(frame) {
    return frame.tag === 'div' && frame.attribs.class === 'audio-container '
  }
}
