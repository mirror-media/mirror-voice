import _ from 'lodash'

export default resizedTargets => {
  return `
    ${_.get(resizedTargets, ['mobile', 'url'], '')} 800w,
    ${_.get(resizedTargets, ['tablet', 'url'], '')} 1200w,
    ${_.get(resizedTargets, ['desktop', 'url'], '')} 2000w
  `
}
