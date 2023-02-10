require("dotenv").config();

module.exports = {
  defaultTimeout: process.env.DEFAULT_TIMEOUT
    ? parseInt(process.env.DEFAULT_TIMEOUT, 10)
    : 25000,
  port: process.env.PORT,
  reactAppHost: process.env.REACT_APP_HOST,
  publicUrl: process.env.PUBLIC_URL,
  urlBucket: process.env.URL_BUCKET,
  bucket: process.env.BUCKET,
  s3BucketFolder: process.env.S3_BUCKET_FOLDER_AWS,
  regionAws: process.env.REGION_AWS,
  apiKey: process.env.REACT_APP_API_KEY,
  // project
  fbAppId: "716059569917686",
  fbSecretKey: "fb5b65cc31b744ac8d0e06b2a7d02d07",
  fbToken: "EAAKLQJxNjvYBAMIurLB8FJ8wut2Jamkcyt0KKlbVyMGVXGJLT0CEx58M77V3fZBoIV2xxZAC86qM5xqHG4S6D0thhCTVflOxuEPO9UnPL3RjNhbSKaB5Dvo9GIbdDd4pwgilQbGaOq1wv27dP7JmClx5FsDXNoZBW3alijWrp6ckb47KA6I",


  googleClientId: "849821171640-b79b8j25ccc6of0av318hbi0iufkvu87.apps.googleusercontent.com"
};
