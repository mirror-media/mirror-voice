import _ from 'lodash'

export default o => {
  const imageKey = 'heroImage' in o ? 'heroImage' : 'image'
  const result = _.get(o, [imageKey, 'image', 'resizedTargets'], {})
  const sourceImageUrl = _.get(o, [imageKey, 'image', 'url'], {})
  return Object.assign({}, result, { source: { url: sourceImageUrl } })
}
