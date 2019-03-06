import _ from 'lodash'

export default o => {
  const imageKey = 'heroImage' in o ? 'heroImage' : 'image'
  return _.get(o, [imageKey, 'image', 'resizedTargets'], {})
}
