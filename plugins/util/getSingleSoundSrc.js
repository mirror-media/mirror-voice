import _ from 'lodash'

import TTS_CONFIG from '~/plugins/constants/ttsConfig'
const { TTS_BASEURL, TTS_DEFAULT_EXT } = TTS_CONFIG

export default single => {
  const customAudio = _.get(single, ['audio', 'audio', 'url'], '')
  const id = _.get(single, 'id', '')
  return customAudio !== ''
    ? customAudio
    : `${TTS_BASEURL}/${id}.${TTS_DEFAULT_EXT}`
}
