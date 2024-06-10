const express = require("express")
const authCtrl = require("../controllers/authCtrl")

const authRouter = express.Router()

authRouter.post("/login", authCtrl.login)

module.exports = authRouter
