const express = require("express")
const productCtrl = require("../controllers/productCtrl")
const { validateParams, isValidId, validateBody } = require("../middlewars")
const { schemas } = require("../models/product")

const productsRouter = express.Router()

productsRouter.get(
  "/",
  validateParams(schemas.paramsProductSchema),
  productCtrl.getAll
)

productsRouter.get("/:productId", isValidId, productCtrl.getById)

productsRouter.post(
  "/",
  //authenticate,
  validateBody(schemas.addProductSchema),
  productCtrl.add
)

productsRouter.delete("/:productId", isValidId, productCtrl.deleteById)

productsRouter.put(
  "/:productId",
  //authenticate,
  isValidId,
  validateBody(schemas.addProductSchema),
  productCtrl.updateById
)

module.exports = productsRouter
