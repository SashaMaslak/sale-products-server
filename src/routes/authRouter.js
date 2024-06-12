const express = require("express")
const authCtrl = require("../controllers/authCtrl")
const { validateBody } = require("../middlewars")
const { schemas } = require("../models/user")

const authRouter = express.Router()

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  authCtrl.register
)
authRouter.post("/login", validateBody(schemas.loginSchema), authCtrl.login)

module.exports = authRouter
