const { httpError } = require("../helpers")

const validateParams = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.query)

    if (error) {
      next(httpError(400, error.message))
    }

    next()
  }
  return func
}

module.exports = validateParams
