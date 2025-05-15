import { Sequelize } from "sequelize";

// Import all model schemas

// # =====================
// # Subscription Catalog Management Service Schemas Import
// # =====================

import OrganizationPlanSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationPlanSchema.js";
import OrganizationPlanSubscriptionSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationPlanSubscriptionSchema.js";
import OrganizationModuleSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationModuleSchema.js";
import OrganizationSubmoduleSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationSubmoduleSchema.js";
import OrganizationModuleSubmoduleSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationModuleSubmoduleSchema.js";

// # =========================================================================

// # =====================
// # Database Model Initialization Configuration
// # =====================

const models = {
  OrganizationPlan: OrganizationPlanSchema(sequelize, Sequelize.DataTypes),
  OrganizationModule: OrganizationModuleSchema(sequelize, Sequelize.DataTypes),
  OrganizationSubmodule: OrganizationSubmoduleSchema(
    sequelize,
    Sequelize.DataTypes
  ),
  OrganizationModuleSubmodule: OrganizationModuleSubmoduleSchema(
    sequelize,
    Sequelize.DataTypes
  ),
  OrganizationPlanSubscription: OrganizationPlanSubscriptionSchema(
    sequelize,
    Sequelize.DataTypes
  ),
};

const subscriptionCatalogDB = {
  ...models,
};

// # =====================
// # Database Synchronization
// # =====================

const syncSubscriptionCatalogDB = async () => {
  try {
    await db.OrganizationPlan.sync();
    await db.OrganizationModule.sync();
    await db.OrganizationSubmodule.sync();
    await db.OrganizationModuleSubmodule.sync();
    await db.OrganizationPlanSubscription.sync();
    console.log(
      "✅ All Subscription Catalog Management Service tables synchronized successfully"
    );
    return true;
  } catch (error) {
    console.error(
      "❌ Subscription Catalog Management Service tables sync failed:",
      error
    );
    throw error;
  }
};

export { syncSubscriptionCatalogDB, subscriptionCatalogDB };
