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
  fbAppId: "1125848001425918",
  fbSecretKey: "9a56bfc69c2689ade2b9cd699be48662",
  fbToken: "EAAKLQJxNjvYBAMIurLB8FJ8wut2Jamkcyt0KKlbVyMGVXGJLT0CEx58M77V3fZBoIV2xxZAC86qM5xqHG4S6D0thhCTVflOxuEPO9UnPL3RjNhbSKaB5Dvo9GIbdDd4pwgilQbGaOq1wv27dP7JmClx5FsDXNoZBW3alijWrp6ckb47KA6I",
  tokenFb: "ee868ebe7ccb81fa837c308c75f82f10",

  googleClientId: "849821171640-b79b8j25ccc6of0av318hbi0iufkvu87.apps.googleusercontent.com"
};
