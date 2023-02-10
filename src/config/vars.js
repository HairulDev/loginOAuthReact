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
  fbAppId: "747007070005461",
  fbSecretKey: "88180ec722cb41bc1293c3da9e46f6bc",
  fbToken: "2d64163ee6245849c25daf4d2f9765f6",

  googleClientId: "849821171640-b79b8j25ccc6of0av318hbi0iufkvu87.apps.googleusercontent.com"
};
