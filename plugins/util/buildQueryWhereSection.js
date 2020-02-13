import _ from 'lodash'

export default (params = {}, sectionIds = []) => {
  const customizer = (objValue, srcValue) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }

  return _.mergeWith(
    params,
    {
      where: {
        sections: {
          $in: sectionIds
        }
      }
    },
    customizer
  )
}
