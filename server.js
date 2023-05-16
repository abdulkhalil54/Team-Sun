require("dotenv").config()
const fs = require("fs");
const express = require('express')
const path = require("path")
const multer = require("multer")
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
const session = require('express-session');
fs
let storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
})
const upload = multer({ storage: storage }) 

let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});



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
app.get('/api/redirect/application/submit', (req, res) => {
  res.redirect("/application/submit");
});

app.use('/application/submit', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "applicationSubmit.html"));
});

app.use('/api/application/submit', upload.single('fileAttachment'), (req, res)=>{
  console.log(req.file);
  // const key = req.session.user.username + "_" + "attachment.pdf"
  const stream = fs.createReadStream(req.file.destination + req.file.filename);
  const uploadParams = {Bucket: "attachments-429-manager-app", Key: req.file.filename, Body: stream};

  link = ""
  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
  if (err) {
      console.log("Upload Failure", err);
      return res.status(502)
  } if (data) {
      console.log("Upload Success", data.Location);
      link = data.Location;
  }
  });

  const {firstName, lastName, year, reference1_name, reference1_contact, grade,section1_time, section2_time, section3_time, section4_time} = req.body

  console.log(req.body)
  //await db.none("INSERT INTO Student(username, conflict, ranking, sectionRanked)")

});



app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})