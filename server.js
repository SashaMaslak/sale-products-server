const app = require("./app")

require("dotenv").config()
const { PORT = 3004 } = process.env

const server = app.listen(PORT, () => {
  console.log(`The server is started on the port: ${PORT}`)
})

server.on("error", err => {
  console.error("An error occurred while starting the server:", err)
  process.exit(1)
})
