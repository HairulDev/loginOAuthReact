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
  fbAppId: "855404745690633",
  fbSecretKey: "455d3992c05429e97d76a6e2d50c05e2",
  fbToken: "EAAMJZCHABjgkBAD00J1xrSX7vAxb8HCdEw0dwq2CY6PI6ithqbPChNVqZBZCwPAW1g2HoPLw3PNfDOS74vHhscWYK0aO2qmH0RJcWwFhF9lZCa0LmeUwhl3w1uUeD1GdWr3Xz6TD0hlIwp8Ia7yMy0HNd7hANaLXvHGFHNHJJBTOEA9Ksooup8jgrLZBddaUZD",

  googleClientId: "849821171640-b79b8j25ccc6of0av318hbi0iufkvu87.apps.googleusercontent.com"
};
