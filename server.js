require("dotenv").config()
const express = require('express')
const app = express()
const port = 3000

const {db, pgp} = require('./database/dbConn')

const fs = require("fs");
const path = require("path")


const cookieParser = require('cookie-parser');
const session = require('express-session');

const multer = require("multer")
let storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    //TODO: add username to filename
    cb(null, req.session.user.username + "-" + Date.now() + "-" + file.originalname);
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

app.get('/api/redirect/portal/student', (req, res) => {
  res.redirect("/portal/student");
});

app.post('/portal/student', require("./routes/studentPortalRoutes"));

//if the user is loggin out, destroy the session and redirect to login
app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });
  res.json({ success: true });
});

//To go to and render the applcaiiton submission page
app.get('/api/redirect/application/submit', (req, res) => {
  res.redirect("/application/submit");
});

app.use('/application/submit', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "applicationSubmit.html"));
});

app.use('/api/application/submit', upload.single('fileAttachment'), async (req, res)=>{
  const stream = fs.createReadStream(req.file.destination + req.file.filename);
  const uploadParams = {Bucket: "attachments-429-manager-app", Key: req.file.filename, Body: stream};

  link = ""
  // call S3 to retrieve upload file to specified bucket
  let uploadRes = undefined
  try{
    uploadRes = await s3.upload(uploadParams).promise();
  } catch(err){
    console.log(err);
    return res.status(502);
  }

  console.log(uploadRes);

  fs.unlink(req.file.destination + req.file.filename, (err) => {
    if (err) throw err;
    console.log(req.file.destination + req.file.filename +' was deleted');
  })

  console.log(req.body)
  const {name, year, reference1_name, reference1_contact, grade, section1_time, section2_time, section3_time, section4_time} = req.body

  preferences = [[1, parseInt(section1_time)], [2, parseInt(section2_time)], [3, parseInt(section3_time)], [4, parseInt(section4_time)]]

  await db.none("INSERT INTO applicationInfo(username, name, year, grade, referenceName, referenceContact, attachment, preferences, status)"
   + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", 
   [req.session.user.username, name, year, grade, reference1_name, reference1_contact, uploadRes.Location, preferences, 2])
  .catch((error)=>{
    console.log("Application Upload Error");
    console.log(error);
    return res.status(404).json("ERROR: soem error occured");
  })

  const sectionRes = await db.one("SELECT count(*) as section_count from sectionsInfo");
  console.log(sectionRes);

  for (let i = 0; i < sectionRes.section_count; i++) {
    await db.none("INSERT INTO sectionsApplicants(id, studentUsername, professorPreferences) VALUES($1, $2, $3)", [i+1, req.session.user.username, -1])
    .catch((error)=>{
      console.log("SectionApplicantsUpdateError");
      console.log(error);
      return res.status(404).json("ERROR: some error occured");
    })
  }

  return res.status(200).json("Applcaition submission successful");

});

//rendering the professor portal, endpoints #41 #42
app.get("/portal/professor", require("./routes/professorPortalRoutes"));

app.get("/api/portal/professor", require("./routes/professorPortalRoutes"));


//@desc professor portal
//@route GET /api/redirect/portal/professor/section/:id
//endpoint 51
app.get('/api/redirect/portal/professor/section/:id', (req, res, next) => {
  res.redirect("/portal/professor/section/" + req.params.id);
});

//Professor's view of a section
app.get("/portal/professor/section/:id", require("./routes/professorPortalRoutes"));

//Professor's view of a section
app.get("/api/portal/professor/section/:id", require("./routes/professorPortalRoutes"));

app.get('/api/redirect/application/view/:username', (req, res, next) => {
  res.redirect("/application/view/" + req.params.username);
});

app.get('/application/view/:username', require("./routes/professorPortalRoutes"));

app.get('/api/application/view/:username', require("./routes/professorPortalRoutes"));

app.get('/api/match', require("./matching/matchingRoutes"));

app.post('/api/portal/professor/section/:sectionID', require("./routes/professorPortalRoutes"));

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

