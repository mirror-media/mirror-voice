import buildQuery from './buildQuery'
// import filterAudioSections from './filterAudioSections'
import getSrcset from './getSrcset'
import getImgs from './getImgs'
import secondsToHms from './secondsToHms'
import getSingleSoundSrc from './getSingleSoundSrc'
import getHtmlText from './getHtmlText'
import normalizeSingle from './normalizeSingle'
import toPayloadObject from './toPayloadObject'

export default (context, inject) => {
  inject('buildQuery', buildQuery)
  // inject('filterAudioSections', filterAudioSections)
  inject('getSrcset', getSrcset)
  inject('getImgs', getImgs)
  inject('secondsToHms', secondsToHms)
  inject('getSingleSoundSrc', getSingleSoundSrc)
  inject('getHtmlText', getHtmlText)
  inject('normalizeSingle', normalizeSingle)
  inject('toPayloadObject', toPayloadObject)
}
