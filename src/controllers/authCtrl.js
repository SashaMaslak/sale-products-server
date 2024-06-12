const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../models/user.js")
const { ctrlWrapper, httpError } = require("../helpers")
require("dotenv").config()
const { SECRET_KEY } = process.env

const register = async (req, res) => {
  const { name, password } = req.body
  const user = await User.findOne({ name })
  if (user) {
    throw httpError(409, "Name already in use")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const id = new Date().getTime()

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    id,
    verify: true,
  })

  res.status(201).json({
    message: `${newUser.name} - was created successfully. Please press [Sign In] to login.`,
  })
}

const login = async (req, res) => {
  const { name, password } = req.body
  const user = await User.findOne({ name })
  if (!user) {
    throw httpError(401, "Name or password is wrong")
  } else if (!user.verify) {
    throw httpError(401, "User not verified")
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw httpError(401, "Name or password is wrong")
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
    user,
    message: `${user.name} - was entered successfully`,
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
}
