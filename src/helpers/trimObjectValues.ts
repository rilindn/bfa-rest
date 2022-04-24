export default function trimObjectValues(obj: any) {
  return Object.keys(obj).reduce((acc: any, curr: any) => {
    acc[curr] = obj[curr].trim()
    return acc
  }, {})
}
