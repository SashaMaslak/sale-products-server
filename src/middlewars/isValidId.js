const { isValidObjectId } = require("mongoose")
const { httpError } = require("../helpers")

const isValidId = (req, res, next) => {
  const { productId } = req.params

  if (!isValidObjectId(productId)) {
    next(httpError(400, `${productId} is not valid id`))
  }

  next()
}

module.exports = isValidId
