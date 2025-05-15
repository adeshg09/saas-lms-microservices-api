import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { initializeSubscriptionCatalogDB } from "./config/db.config.js";
import { envSubscriptionCatalogConfig } from "./config/env.config.js";

const app = express();

// Basic middleware only
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
await initializeSubscriptionCatalogDB();

// Basic route
app.get("/health", (req, res) => {
  res.send("Welcome to the  Subcription Catalog Management Service");
});

const PORT = envSubscriptionCatalogConfig.SUBSCRIPTION_CATALOG_PORT || 8003;

app.listen(PORT, () => {
  console.log(
    `Subcription Catalog Management Service  Server running on port ${PORT}`
  );
});
