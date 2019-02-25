import _ from 'lodash'

export default o => {
  return _.get(o, ['heroImage', 'image', 'resizedTargets'], {})
}
