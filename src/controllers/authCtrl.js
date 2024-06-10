const ctrlWrapper = require("../helpers/ctrlWrapper")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
  const { userName, password } = req.body

  const payload = {
    userName,
  }
  const token = jwt.sign(payload, "12345", { expiresIn: "23h" })

  res.json({ token })
}

module.exports = {
  login: ctrlWrapper(login),
}
