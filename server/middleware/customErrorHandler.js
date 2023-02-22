const customErrorHandler = function (req, res, next) {
  //multiple routes will hit this middleware, how to know when !user, if i am sending a product, meaning that were will be no !user, will it trigger user error even from a another route?

  next() // this is the less clear part ....IIFE to call the callback?
}

export default customErrorHandler
