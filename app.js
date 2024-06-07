const express = require("express")
const logger = require("morgan")
const cors = require("cors")

// const authRouter = require("./routes/auth")
// const productsRouter = require("./routes/notices")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.post("/auth", (req, res) => {
  const { username, password } = req.body
  if (username === "admin" && password === "admin") {
    res.json({ message: "Successful authentication" })
  } else {
    res.status(401).json({ message: "Invalid credentials" })
  }
})

app.get("/products", (req, res) => {
  res.json({ message: "List of products" })
})

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err
  res.status(status).json({ message })
})

module.exports = app
