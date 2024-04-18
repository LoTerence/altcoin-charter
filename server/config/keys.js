module.exports = {
  app: {
    name: "Crypto Charts",
    apiURL: `${process.env.BASE_API_URL}`,
    clientURL: process.env.CLIENT_URL,
    serverURL: process.env.SERVER_URL,
  },
  port: process.env.PORT || 5000,
  database: {
    url: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: "7d",
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },
};
