import _ from 'lodash'

export default single => {
  const customAudio = _.get(single, ['audio', 'audio', 'url'], '')
  const id = _.get(single, 'id', '')
  return customAudio !== ''
    ? customAudio
    : `http://www.mirrormedia.mg/assets/audios/${id}.wav`
}
