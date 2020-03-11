import _ from 'lodash'
import getImgs from './getImgs'
import getSingleSoundSrc from './getSingleSoundSrc'

export default post => ({
  title: _.get(post, 'title', ''),
  slug: _.get(post, 'slug', ''),
  coverImgSrc: _.get(getImgs(post), ['mobile', 'url'], ''),
  audioSrc: getSingleSoundSrc(post)
})
