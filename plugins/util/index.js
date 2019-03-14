import buildQuery from './buildQuery'
import filterAudioSections from './filterAudioSections'
import getSrcset from './getSrcset'
import getImgs from './getImgs'
import secondsToHms from './secondsToHms'
import getSingleSoundSrc from './getSingleSoundSrc'

export default (context, inject) => {
  inject('buildQuery', buildQuery)
  inject('filterAudioSections', filterAudioSections)
  inject('getSrcset', getSrcset)
  inject('getImgs', getImgs)
  inject('secondsToHms', secondsToHms)
  inject('getSingleSoundSrc', getSingleSoundSrc)
}
