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
  app.get("/org-mgmt-service", (req, res) => {
    res.send("Welcome to the Saas-LMS API Organization Management Service");
  });

  const PORT = process.env.ORGANIZATION_MANAGEMENT_SERVICE_PORT || 8003;

  app.listen(PORT, () => {
    console.log(
      `Organization Management Service Server running on port ${PORT}`
    );
  });
}

initializeApp().catch((err) => {
  console.error("❌ Failed to start application:", err);
  process.exit(1);
});
