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
  fbAppId: "2426217420877952",
  fbSecretKey: "2aafb736282662ee555951e66dc3f8fe",
  fbToken: "f7da6c2313c8e066b0d73773d5098ab0",
  googleClientId: "849821171640-b79b8j25ccc6of0av318hbi0iufkvu87.apps.googleusercontent.com"
};
