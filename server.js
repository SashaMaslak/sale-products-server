const express = require("express")
const logger = require("morgan")
const cors = require("cors")

require("dotenv").config()
const { PORT = 3004 } = process.env

// const authRouter = require("./routes/api/auth")
// const productsRouter = require("./routes/api/notices")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.post("/auth", (req, res) => {
  const { username, password } = req.body
  if (username === "admin" && password === "password") {
    res.json({ message: "Успешная аутентификация" })
  } else {
    res.status(401).json({ message: "Неверные учетные данные" })
  }
})

app.get("/products", (req, res) => {
  res.json({ message: "Список продуктов" })
})

const server = app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`)
})

server.on("error", err => {
  console.error("Сталася помилка під час запуску сервера:", err)
  process.exit(1)
})
