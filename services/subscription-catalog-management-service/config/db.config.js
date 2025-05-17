import { Sequelize } from "sequelize";
import { envSubscriptionCatalogConfig } from "./env.config.js";
// Import all model schemas

// # =====================
// # Subscription Catalog Management Service Schemas Import
// # =====================

import OrganizationPlanSchema from "../models/master/OrganizationPlanSchema.js";
import OrganizationPlanSubscriptionSchema from "../models/master/OrganizationPlanSubscriptionSchema.js";
import OrganizationModuleSchema from "../models/master/OrganizationModuleSchema.js";
import OrganizationSubmoduleSchema from "../models/master/OrganizationSubmoduleSchema.js";
import OrganizationModuleSubmoduleSchema from "../models/master/OrganizationModuleSubmoduleSchema.js";
import { generateNameByDisplayName } from "../utils/index.js";

// # =========================================================================

// // # =====================
// // # Sequelize Configuration
// // # =====================

const sequelize = new Sequelize(
  envSubscriptionCatalogConfig.DB_NAME,
  envSubscriptionCatalogConfig.DB_USER,
  envSubscriptionCatalogConfig.DB_PASSWORD,
  {
    host: envSubscriptionCatalogConfig.DB_HOST,
    dialect: envSubscriptionCatalogConfig.DB_DIALECT,
    port: envSubscriptionCatalogConfig.DB_PORT,
    logging:
      envSubscriptionCatalogConfig.DB_LOGGING === "true" ? console.log : false,
    connectionLimit: envSubscriptionCatalogConfig.DB_CONNECT_LIMIT,
    acquireTimeout: envSubscriptionCatalogConfig.DB_ACQUIRE_TIMEOUT,
    waitForConnections: envSubscriptionCatalogConfig.DB_WAIT_FOR_CONNECTION,
    charset: envSubscriptionCatalogConfig.DB_CHARSET,
    pool: {
      max: Number(envSubscriptionCatalogConfig.DB_POOL_MAX),
      min: Number(envSubscriptionCatalogConfig.DB_POOL_MIN),
      acquire: Number(envSubscriptionCatalogConfig.DB_POOL_ACQUIRE),
      idle: Number(envSubscriptionCatalogConfig.DB_POOL_IDLE),
    },
  }
);

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
  Sequelize,
  sequelize,
  ...models,
};

// // # =====================
// // # Define Database Model Associations
// // # =====================

// Object.keys(subscriptionCatalogDB).forEach((modelName) => {
//   if (subscriptionCatalogDB[modelName]?.associate) {
//     subscriptionCatalogDB[modelName].associate(subscriptionCatalogDB);
//   }
// });

// # =====================
// # Database Synchronization
// # =====================

const syncSubscriptionCatalogDB = async () => {
  try {
    // await subscriptionCatalogDB.OrganizationPlan.sync();
    // await subscriptionCatalogDB.OrganizationModule.sync();
    // await subscriptionCatalogDB.OrganizationSubmodule.sync();
    // await subscriptionCatalogDB.OrganizationModuleSubmodule.sync();
    // await subscriptionCatalogDB.OrganizationPlanSubscription.sync();
    await subscriptionCatalogDB.sequelize.sync({ alter: true });

    console.log(
      "✅ All Subscription Catalog Management Service tables synchronized successfully"
    );
    return true;
  } catch (error) {
    console.error(
      "❌ Subscription Catalog Management Service tables synchronized failed:",
      error
    );
    throw error;
  }
};

const initializeSubscriptionCatalogDB = async () => {
  try {
    await subscriptionCatalogDB.sequelize.authenticate();
    console.log("✅ SubscriptionCatalog Database connected successfully.");

    await syncSubscriptionCatalogDB();

    const defaultPlan = await subscriptionCatalogDB.OrganizationPlan.findOne({
      where: {
        name: envSubscriptionCatalogConfig.DEFAULT_ORGANIZATION_PLAN,
        isDeleted: false,
      },
    });

    if (!defaultPlan) {
      await subscriptionCatalogDB.OrganizationPlan.create({
        name: generateNameByDisplayName(
          envSubscriptionCatalogConfig.DEFAULT_ORGANIZATION_PLAN
        ),
        displayName: envSubscriptionCatalogConfig.DEFAULT_ORGANIZATION_PLAN,
        description: "Default Plan for Organization",
        moduleIds: [1],
      });
    }
  } catch (error) {
    console.error(
      "❌ SubscriptionCatalog Database initialization failed:",
      error
    );
    process.exit(1);
  }
};

export { subscriptionCatalogDB, initializeSubscriptionCatalogDB };
