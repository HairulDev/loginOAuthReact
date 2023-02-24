

const env = {
  defaultTimeout: process.env.DEFAULT_TIMEOUT
    ? parseInt(process.env.DEFAULT_TIMEOUT, 10)
    : 25000,
  port: process.env.PORT,
  reactAppHost: process.env.REACT_APP_HOST,
  publicUrl: process.env.REACT_APP_PUBLIC_URL,
  urlBucket: process.env.REACT_APP_URL_BUCKET,
  bucket: process.env.REACT_APP_BUCKET,
  s3BucketFolder: process.env.REACT_APP_S3_BUCKET_FOLDER_AWS,
  regionAws: process.env.REACT_APP_REGION_AWS,
  apiKey: process.env.REACT_APP_API_KEY,
  fbAppId: process.env.REACT_APP_FB_ID,
  fbSecretKey: process.env.REACT_APP_FB_SECRET_KEY,
  fbToken: process.env.REACT_APP_FB_TOKEN,
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
}

export default env;