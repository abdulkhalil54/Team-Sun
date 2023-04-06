var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

var bucketName = "attachments-429-manager-app"

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket : bucketName
};

// call S3 to create the bucket
// s3.createBucket(bucketParams, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Location);
//   }
// });

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: bucketName, Key: '', Body: ''};
var file = process.argv[2];

// // Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload(uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});