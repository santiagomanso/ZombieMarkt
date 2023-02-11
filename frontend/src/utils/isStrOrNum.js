export const isStrOrNum = (text) => {
  let type = +text.charAt(0)
  if (isNaN(type)) {
    return 'string'
  } else {
    return 'number'
  }
}
