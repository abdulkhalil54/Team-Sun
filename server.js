require("dotenv").config()
const express = require('express')
const path = require("path")
const app = express()
const port = 3000

app.use("/", express.static(path.join(__dirname, "/public")));

app.use(express.json())

app.get('/', require("./routes/rootRoutes"));

app.get('/login/:username/:password', require("./routes/loginRoutes"));
app.post('/register', require("./routes/loginRoutes"));
//app.get('/application', require("./routes/loginRoutes"));

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})