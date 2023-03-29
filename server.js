const express = require('express')
const path = require("path")
const app = express()
const port = 3000

app.use("/", express.static(path.join(__dirname, "/public")))

app.get('/', require("./routes/login"));

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})