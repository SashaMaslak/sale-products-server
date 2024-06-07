const { ctrlWrapper, httpError } = require("helpers")

// const { schemas } = require("../../models/notice")

const getAll = async (req, res) => {
  res.json({
    pages,
    notices: result.map(transformMinifiedNotice),
  })
}

module.exports = {
  getAll: ctrlWrapper(getAll),
}
