require("dotenv").config()
const express = require('express')
const path = require("path")
const multer = require("multer")
const app = express()
const port = 3000
var cookieParser = require('cookie-parser');
var session = require('express-session');
const upload = multer({ dest: 'uploads/' }) 

app.use(cookieParser());
app.use(session({secret: "TeamSun"}));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

//Redirect from root to portal pages if the user or logged in, or the login page if not.
app.get('/', function(req, res) {
  console.log(req.session);
  if(req.session.user) {
      if(req.session.user.type) {
          res.redirect("/portal/professor")
      } else {
          res.redirect("/portal/student");
      }
  } else {
      res.redirect("/login");
  }
});

app.get('/login', require("./routes/loginRoutes"));

app.post("/login", require("./routes/loginRoutes"));

app.get('/register', require("./routes/registerRoutes"));

app.post('/register', require("./routes/registerRoutes"));

app.get('/portal/student', require("./routes/studentPortalRoutes"));

app.post('/portal/student', require("./routes/studentPortalRoutes"));

//if the user is loggin out, destroy the session and redirect to login
app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });
  res.redirect('/login');
});


//To go to and render the applcaiiton submission page
app.get('/api/redirect/application/submit', (req, res, next) => {
  res.redirect("/application/submit");
});
app.use('/application/submit', (req, res, next) => {
  res.sendFile(path.join("..", "views", "applicationSubmit.html"));
});

app.use('/api/application/submit', upload.single('fileAttachment'), require('./routes/applicationSubmitRoutes'));

//@desc professor portal
//@route GET /api/redirect/portal/professor/section/:id
//endpoint 51
app.get('/api/redirect/portal/professor/section/:id', (req, res, next) => {
  res.redirect("/portal/professor/section/" + req.params.id);
});

//@desc professor portal
//@route GET /portal/professor/section/:id
//endpoint 52
app.get('/portal/professor/section/:id', require("./routes/professorPortalSectionRoutes"));

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})