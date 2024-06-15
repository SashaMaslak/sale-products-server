const { Product } = require("../models/product")
require("dotenv").config()
const { ctrlWrapper, httpError } = require("../helpers")

const getAll = async (req, res) => {
  // const { _id: owner } = req.user

  const { page = 1, limit = 25 } = req.query
  const skip = (page - 1) * limit

  let objForFind = {}

  const products = await Product.find(objForFind, "createdAt updateAt", {
    skip,
    limit,
  })
    .sort({ _id: -1 })
    .populate("creator")
  res.json(products)
}

const getById = async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId).populate("creator")
  if (!product) {
    throw httpError(404, "Product not found")
  }
  res.json({ product })
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
}
