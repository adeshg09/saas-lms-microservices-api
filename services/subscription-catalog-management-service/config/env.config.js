import dotenv from "dotenv";
dotenv.config();

export const envSubscriptionCatalogConfig = {
  // Server
  SUBSCRIPTION_CATALOG_PORT: process.env.PORT,
};
