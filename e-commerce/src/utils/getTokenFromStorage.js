//NOTE only returns token if there is one, else the token will be undefined
const getTokenFromStorage = () => {
  if (window.localStorage.getItem('token')) {
    return window.localStorage.getItem('token')
  }
}
export default getTokenFromStorage
