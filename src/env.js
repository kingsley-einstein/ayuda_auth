if (process.env.NODE_ENV !== "production") require("dotenv").config();

export default {
  jwtSecret: process.env.JWT_SECRET,
  port: {
    development: parseInt(process.env.PORT),
    test: parseInt(process.env.TEST_PORT),
    production: parseInt(process.env.PORT)
  },
  db: {
    development: {
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      dialect: "postgres"
    },
    test: {
      database: process.env.TEST_DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      dialect: "postgres"
    },
    production: {
     database: process.env.DB_NAME,
     username: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     host: process.env.DB_HOST,
     port: parseInt(process.env.DB_PORT),
     dialect: "postgres"
   }
  },
  cloud: {
    url: process.env.CLOUD_URL,
    name: process.env.CLOUD_NAME,
    profiles: process.env.NODE_ENV
  }
};
