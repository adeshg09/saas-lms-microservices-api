import dotenv from "dotenv";
dotenv.config();

export const envOrganizationConfig = {
  // Server
  ORGANIZATION_PORT: process.env.PORT,
};
