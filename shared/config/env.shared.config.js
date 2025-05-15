import dotenv from "dotenv";
dotenv.config();

export const envSharedConfig = {
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

  // App Version
  APP_VERSION: process.env.APP_VERSION,
};
