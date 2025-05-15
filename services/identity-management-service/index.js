import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { initializeIdentityDB } from "./config/db.config.js";
import { envIdentityConfig } from "./config/env.config.js";

import authRoutes from "./routes/auth.js";
import accountRoutes from "./routes/account.js";
import masterUserRoutes from "./routes/master/master-user.js";
import masterRoleRoutes from "./routes/master/master-role.js";
import masterDashboardRoutes from "./routes/master/master-dashboard-sections.js";
import authenticatedRoute from "./middleware/authentication.js";
const app = express();

// Basic middleware only
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
await initializeIdentityDB();

//------------------------ Auth Routes ------------------------//
app.use("/auth", authRoutes);
app.use("/account", authenticatedRoute, accountRoutes);

//------------------------ Master Dashboard Routes ------------------------//
app.use("/admin/master/dashboard", masterDashboardRoutes);
app.use("/admin/master/user", masterUserRoutes);
app.use("/admin/master/role", masterRoleRoutes);

// Basic route
app.get("/health", (req, res) => {
  res.send("Welcome to the Identity Management Service");
});

const PORT = envIdentityConfig.AUTH_PORT || 8001;

app.listen(PORT, () => {
  console.log(`Identity Management Service  Server running on port ${PORT}`);
});
