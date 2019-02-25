import buildQuery from './buildQuery'
import getSrcset from './getSrcset'
import getImgs from './getImgs'

export default (context, inject) => {
  inject('buildQuery', buildQuery)
  inject('getSrcset', getSrcset)
  inject('getImgs', getImgs)
}
