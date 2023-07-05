export const setPathOnStorage = (path) => {
  localStorage.removeItem('path')
  localStorage.setItem('path', path)
}

export const getPathFromStorage = () => {
  return localStorage.getItem('path')
}

export const removePathFromStorage = () => {
  return localStorage.removeItem('path')
}
