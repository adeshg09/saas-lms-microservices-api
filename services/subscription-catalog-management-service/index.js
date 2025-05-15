import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { initializeDatabase } from "../../shared/config/db.config.js";
async function initializeApp() {
  const app = express();

  // Basic middleware only
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database
  await initializeDatabase();

  // Basic route
  app.get("/subsc-cat-mgmt-service", (req, res) => {
    res.send(
      "Welcome to the Saas-LMS API Subcription Catalog Management Service"
    );
  });

  const PORT = process.env.SUBSCRIPTION_MANAGEMENT_SERVICE_PORT || 8004;

  app.listen(PORT, () => {
    console.log(
      `Subcription Catalog Management Service  Server running on port ${PORT}`
    );
  });
}

initializeApp().catch((err) => {
  console.error("❌ Failed to start application:", err);
  process.exit(1);
});
