const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const path = require("path")

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

var bucketName = "attachments-429-manager-app"

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket : bucketName
};

const submitApplication = asyncHandler(async (req, res) => {
    const key = req.session.user.username + "_" + "attachment.pdf"
    const uploadParams = {Bucket: bucketName, Key: key, Body: req.file};

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

    //const {firstName, lastName, year, reference1_name, reference1_contact, grade,section1_time, section2_time, section3_time, section4_time} = req.body

    //await db.none("INSERT INTO Student(username, conflict, ranking, sectionRanked)")

})

module.exports = {
    submitApplication
}