import dotenv from "dotenv";
dotenv.config();

export const envIdentityConfig = {
  // App Version
  APP_VERSION: process.env.APP_VERSION,

  // Server
  AUTH_PORT: process.env.PORT,

  // Database Credentials
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_POOL_MAX: process.env.DB_POOL_MAX,
  DB_POOL_MIN: process.env.DB_POOL_MIN,
  DB_POOL_ACQUIRE: process.env.DB_POOL_ACQUIRE,
  DB_POOL_IDLE: process.env.DB_POOL_IDLE,
  DB_LOGGING: process.env.DB_LOGGING === "true", // Convert string to boolean
  DB_CONNECT_LIMIT: process.env.DB_CONNECT_LIMIT,
  DB_ACQUIRE_TIMEOUT: process.env.DB_ACQUIRE_TIMEOUT,
  DB_WAIT_FOR_CONNECTION: process.env.DB_WAIT_FOR_CONNECTION === "true", // Convert string to boolean
  DB_CHARSET: process.env.DB_CHARSET,

  // Default Super Admin Info
  HOST_FNAME: process.env.HOST_FNAME,
  HOST_LNAME: process.env.HOST_LNAME,
  HOST_EMAIL: process.env.HOST_EMAIL,
  HOST_PASSWORD: process.env.HOST_PASSWORD,
  DEFAULT_ROLE: process.env.DEFAULT_ROLE,
  DEFAULT_MASTER_DASHBOARD_SECTION:
    process.env.DEFAULT_MASTER_DASHBOARD_SECTION,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  RESET_PASSWORD_SECRET_JWT_KEY: process.env.RESET_PASSWORD_SECRET_JWT_KEY,
  GMAIL_SMTP_APP_PASSWORD: process.env.GMAIL_SMTP_APP_PASSWORD,
};
