const express = require("express")
const productCtrl = require("../controllers/productCtrl")
const { validateParams, isValidId } = require("../middlewars")
const { schemas } = require("../models/product")

const productsRouter = express.Router()

productsRouter.get(
  "/",
  validateParams(schemas.paramsNoticeSchema),
  productCtrl.getAll
)

// router.get("/:productId", isValidId, productCtrl.getById)

module.exports = productsRouter
