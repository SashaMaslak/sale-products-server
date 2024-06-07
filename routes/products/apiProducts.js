const express = require("express")
const ctrl = require("controllers/ctrlProducts")

const router = express.Router()

router.get("/", ctrl.getAll)

module.exports = router
