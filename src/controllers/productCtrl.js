const { Product } = require("../models/product")
require("dotenv").config()
const { ctrlWrapper, httpError } = require("../helpers")

const getAll = async (req, res) => {
  // const { _id: owner } = req.user

  const { page = 1, limit = 25 } = req.query
  const skip = (page - 1) * limit

  let objForFind = {}

  const totalResult = await Product.countDocuments(objForFind)

  const products = await Product.find(objForFind, "-createdAt -updateAt", {
    skip,
    limit,
  })
    .sort({ _id: -1 })
    .populate("creator")
  res.json({ products, totalResult })
}

const getById = async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId).populate("creator")
  if (!product) {
    throw httpError(404, "Product not found")
  }

  res.json(product)
}

const add = async (req, res) => {
  const result = await Product.create({ ...req.body })
  res.status(201).json(result)
}

const deleteById = async (req, res) => {
  const { productId } = req.params
  console.log("req.params-delete->", req.params)
  const result = await Product.findOneAndDelete({ _id: productId })
  if (!result) {
    throw httpError(404, "Not found")
  }

  res.json({ message: "Delete success" })
}

const updateById = async (req, res) => {
  const { productId } = req.params
  console.log("req.params-->", req.params)

  const result = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  })
  if (!result) {
    throw httpError(404, "Not found")
  }
  res.json(result)
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
}
