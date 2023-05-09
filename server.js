require("dotenv").config()
const express = require('express')
const path = require("path")
const app = express()
const port = 3000
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "TeamSun"}));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

app.get('/', require("./routes/initialRoutes"));

app.get('/login', require("./routes/loginRoutes"));

app.post("/login", require("./routes/loginRoutes"));

app.get('/register', require("./routes/registerRoutes"));

app.post('/register', require("./routes/registerRoutes"));
//app.get('/application', require("./routes/loginRoutes"));

app.get('/portal/student', require("./routes/studentPortalRoutes"));

app.post('/portal/student', require("./routes/studentPortalRoutes"));

app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });
  res.redirect('/login');
});


app.use('/application', require('./routes/applicationRoutes'));

app.use('/gotoapplication', require('./routes/gotoapplicationRoutes'));


app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})