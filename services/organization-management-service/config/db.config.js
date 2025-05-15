import { Sequelize } from "sequelize";

// Import all model schemas

// # =====================
// # Organization Management Service Schemas Import
// # =====================

import OrganizationSchema from "../../services/organization-management-service/models/master/OrganizationSchema.js";

// # =========================================================================

// # =====================
// # Database Model Initialization Configuration
// # =====================

const models = {
  Organization: OrganizationSchema(sequelize, Sequelize.DataTypes),
};

const organizationDB = {
  ...models,
};

// # =====================
// # Database Synchronization
// # =====================

const syncOrganizationDB = async () => {
  try {
    await db.Organization.sync();

    console.log("✅ All Organization Service tables synchronized successfully");
    return true;
  } catch (error) {
    console.error("❌ Organization Service tables sync failed:", error);
    throw error;
  }
};

export { organizationDB, syncOrganizationDB };
