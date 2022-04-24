import _ from 'lodash'

export default function trimObjectValues(obj: any) {
  return Object.keys(obj).reduce((acc: any, curr: any) => {
    if (_.isString(obj[curr])) acc[curr] = obj[curr].trim()
    else acc[curr] = obj[curr]
    return acc
  }, {})
}
