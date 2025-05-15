// import dotenv from "dotenv";
// dotenv.config();

// import bcrypt from "bcryptjs";
// import { Sequelize } from "sequelize";

// // Import all model schemas

// // # =====================
// // # User Management Service Schemas Import
// // # =====================

// import MasterPermissionSchema from "../../services/user-management-service/models/master/MasterPermissionSchema.js";
// import MasterRoleSchema from "../../services/user-management-service/models/master/MasterRoleSchema.js";
// import MasterRolePermissionSchema from "../../services/user-management-service/models/master/MasterRolePermissionSchema.js";

// // # =====================
// // # Auth Management Service Schemas Import
// // # =====================

// import MasterUserSchema from "../../services/auth-management-service/models/master/MasterUserSchema.js";
// import MasterUserProfileSchema from "../../services/auth-management-service/models/master/MasterUserProfileSchema.js";

// // # =====================
// // # Organization Management Service Schemas Import
// // # =====================

// import OrganizationSchema from "../../services/organization-management-service/models/master/OrganizationSchema.js";

// // # =====================
// // # Subscription Catalog Management Service Schemas Import
// // # =====================

// import OrganizationPlanSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationPlanSchema.js";
// import OrganizationPlanSubscriptionSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationPlanSubscriptionSchema.js";
// import OrganizationModuleSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationModuleSchema.js";
// import OrganizationSubmoduleSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationSubmoduleSchema.js";
// import OrganizationModuleSubmoduleSchema from "../../services/subscription-catalog-management-service/models/master/OrganizationModuleSubmoduleSchema.js";

// // ------------------------------------------------------------------------------------------------------------------------------- //

// // # =====================
// // # Sequelize Configuration
// // # =====================

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     port: process.env.DB_PORT,
//     logging: process.env.DB_LOGGING === "true" ? console.log : false,
//     connectionLimit: process.env.DB_CONNECT_LIMIT,
//     acquireTimeout: process.env.DB_ACQUIRE_TIMEOUT,
//     waitForConnections: process.env.DB_WAIT_FOR_CONNECTION,
//     charset: process.env.DB_CHARSET,
//     pool: {
//       max: Number(process.env.DB_POOL_MAX),
//       min: Number(process.env.DB_POOL_MIN),
//       acquire: Number(process.env.DB_POOL_ACQUIRE),
//       idle: Number(process.env.DB_POOL_IDLE),
//     },
//   }
// );

// // # =====================
// // # Database Model Initialization Configuration
// // # =====================

// const models = {
//   MasterPermission: MasterPermissionSchema(sequelize, Sequelize.DataTypes),
//   MasterRole: MasterRoleSchema(sequelize, Sequelize.DataTypes),
//   OrganizationPlan: OrganizationPlanSchema(sequelize, Sequelize.DataTypes),
//   Organization: OrganizationSchema(sequelize, Sequelize.DataTypes),
//   MasterUser: MasterUserSchema(sequelize, Sequelize.DataTypes),
//   MasterUserProfile: MasterUserProfileSchema(sequelize, Sequelize.DataTypes),
//   MasterRolePermission: MasterRolePermissionSchema(
//     sequelize,
//     Sequelize.DataTypes
//   ),
//   OrganizationModule: OrganizationModuleSchema(sequelize, Sequelize.DataTypes),
//   OrganizationSubmodule: OrganizationSubmoduleSchema(
//     sequelize,
//     Sequelize.DataTypes
//   ),
//   OrganizationModuleSubmodule: OrganizationModuleSubmoduleSchema(
//     sequelize,
//     Sequelize.DataTypes
//   ),
//   OrganizationPlanSubscription: OrganizationPlanSubscriptionSchema(
//     sequelize,
//     Sequelize.DataTypes
//   ),
// };

// const db = {
//   Sequelize,
//   sequelize,
//   ...models,
// };

// // # =====================
// // # Define Database Model Associations
// // # =====================

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName]?.associate) {
//     db[modelName].associate(db);
//   }
// });

// // # =====================
// // # Database Synchronization
// // # =====================

// const syncDatabase = async () => {
//   try {
//     await db.MasterPermission.sync();
//     await db.MasterRole.sync();
//     await db.OrganizationPlan.sync();

//     await db.Organization.sync();
//     await db.MasterUser.sync();

//     await db.MasterUserProfile.sync();
//     await db.MasterRolePermission.sync();
//     await db.OrganizationModule.sync();
//     await db.OrganizationSubmodule.sync();
//     await db.OrganizationModuleSubmodule.sync();
//     await db.OrganizationPlanSubscription.sync();

//     console.log("✅ All tables synchronized successfully");
//     return true;
//   } catch (error) {
//     console.error("❌ Database sync failed:", error);
//     throw error;
//   }
// };

// // # =====================
// // # Database Synchronization and Initial Data Seeding
// // # =====================

// export const initializeDatabase = async () => {
//   try {
//     await db.sequelize.authenticate();
//     console.log("✅ Database connected successfully.");

//     await syncDatabase();

//     // Seed initial roles if none exist
//     const roles = await db.MasterRole.findAll();
//     console.log("roles are", roles);
//     if (roles.length === 0) {
//       const createdRoles = await db.MasterRole.bulkCreate(
//         [
//           {
//             name: process.env.DEFAULT_ROLE,
//             description: "Role to manage entire application.",
//             created_by: process.env.HOST_FIRST_NAME,
//           },
//           {
//             name: "Content Manager",
//             description: "Role to manage content only.",
//             created_by: process.env.HOST_FIRST_NAME,
//           },
//         ],
//         {
//           returning: true, // Ensure that the inserted rows are returned
//         }
//       );

//       // Seed admin user if none exists
//       const adminUser = await db.MasterUser.findOne({
//         where: { email: process.env.HOST_EMAIL },
//       });
//       console.log("adminUser is", adminUser);
//       if (!adminUser) {
//         const hashedPassword = await bcrypt.hash(process.env.HOST_PASSWORD, 10);
//         const createdUser = await db.MasterUser.create({
//           firstName: process.env.HOST_FNAME,
//           lastName: process.env.HOST_LNAME,
//           email: process.env.HOST_EMAIL,
//           password: hashedPassword,
//           isActive: true,
//         });

//         if (createdUser) {
//           console.log("createdUser is", createdUser);
//           // Create user profile
//           await db.MasterUserProfile.create({
//             userId: createdUser.id,
//             roleIds: [createdRoles[0].id], // Assign the first role (Host Admin)
//             isHost: true,
//           });
//         }
//         console.log("Admin user created successfully");
//       }
//     }
//   } catch (error) {
//     console.error("Database initialization failed:", error);
//     process.exit(1);
//   }
// };

// export { db };

// import dotenv from "dotenv";
// dotenv.config();

// import bcrypt from "bcryptjs";
// import { Sequelize } from "sequelize";

// // ===== Import DB Configs from Each Service ===== //
// import {
//   syncAuthDb,
//   authDb,
// } from "../../services/identity-management-service/config/db.config.js";
// // import {
// //   syncUserDb,
// //   userDb,
// // } from "../../services/user-management-service/config/db.config.js";
// import {
//   syncOrganizationDb,
//   organizationDb,
// } from "../../services/organization-management-service/config/db.config.js";
// import {
//   syncSubscriptionCatalogDb,
//   subscriptionCatalogDb,
// } from "../../services/subscription-catalog-management-service/config/db.config.js";

// // ------------------------------------------------------------------------------------------------------------------------------- //

// // # =====================
// // # Sequelize Configuration
// // # =====================

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     port: process.env.DB_PORT,
//     logging: process.env.DB_LOGGING === "true" ? console.log : false,
//     connectionLimit: process.env.DB_CONNECT_LIMIT,
//     acquireTimeout: process.env.DB_ACQUIRE_TIMEOUT,
//     waitForConnections: process.env.DB_WAIT_FOR_CONNECTION,
//     charset: process.env.DB_CHARSET,
//     pool: {
//       max: Number(process.env.DB_POOL_MAX),
//       min: Number(process.env.DB_POOL_MIN),
//       acquire: Number(process.env.DB_POOL_ACQUIRE),
//       idle: Number(process.env.DB_POOL_IDLE),
//     },
//   }
// );

// // ===== Combine All Models into One DB Object =====
// const db = {
//   Sequelize,
//   sequelize,
//   ...authDb,
//   ...userDb,
//   ...organizationDb,
//   ...subscriptionCatalogDb,
// };

// // // # =====================
// // // # Define Database Model Associations
// // // # =====================

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName]?.associate) {
//     db[modelName].associate(db);
//   }
// });

// // ===== Master Sync Function to Sync All Tables =====
// const syncAllDatabases = async () => {
//   try {
//     console.log("🔁 Starting database synchronization...");

//     await syncAuthDb();
//     await syncUserDb();
//     await syncOrganizationDb();
//     await syncSubscriptionCatalogDb();

//     console.log("✅ All databases synced successfully.");
//   } catch (err) {
//     console.error("❌ Error syncing databases:", err);
//     process.exit(1); // Exit if sync fails
//   }
// };

// // // # =====================
// // // # Database Synchronization and Initial Data Seeding
// // // # =====================

// export const initializeDatabase = async () => {
//   try {
//     await db.sequelize.authenticate();
//     console.log("✅ Database connected successfully.");

//     await syncAllDatabases();

//     // Seed initial roles if none exist
//     const roles = await db.MasterRole.findAll();
//     console.log("roles are", roles);
//     if (roles.length === 0) {
//       const createdRoles = await db.MasterRole.bulkCreate(
//         [
//           {
//             name: process.env.DEFAULT_ROLE,
//             description: "Role to manage entire application.",
//             created_by: process.env.HOST_FIRST_NAME,
//           },
//           {
//             name: "Content Manager",
//             description: "Role to manage content only.",
//             created_by: process.env.HOST_FIRST_NAME,
//           },
//         ],
//         {
//           returning: true, // Ensure that the inserted rows are returned
//         }
//       );

//       // Seed admin user if none exists
//       const adminUser = await db.MasterUser.findOne({
//         where: { email: process.env.HOST_EMAIL },
//       });
//       console.log("adminUser is", adminUser);
//       if (!adminUser) {
//         const hashedPassword = await bcrypt.hash(process.env.HOST_PASSWORD, 10);
//         const createdUser = await db.MasterUser.create({
//           firstName: process.env.HOST_FNAME,
//           lastName: process.env.HOST_LNAME,
//           email: process.env.HOST_EMAIL,
//           password: hashedPassword,
//           isActive: true,
//         });

//         if (createdUser) {
//           console.log("createdUser is", createdUser);
//           // Create user profile
//           await db.MasterUserProfile.create({
//             userId: createdUser.id,
//             roleIds: [createdRoles[0].id], // Assign the first role (Host Admin)
//             isHost: true,
//           });
//         }
//         console.log("Admin user created successfully");
//       }
//     }
//   } catch (error) {
//     console.error("Database initialization failed:", error);
//     process.exit(1);
//   }
// };

// export { db };
