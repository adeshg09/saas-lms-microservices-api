import { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";
import { envIdentityConfig } from "./env.config.js";

// Import all model schemas

// # =====================
// # Identity Management Service Schemas Import
// # =====================

import MasterDashboardSectionsSchema from "../models/master/MasterDashboardSectionsSchema.js";
import MasterRoleSchema from "../models/master/MasterRoleSchema.js";
import MasterRoleDashboardSectionSchema from "../models/master/MasterRoleDashboardSectionSchema.js";
import MasterUserSchema from "../models/master/MasterUserSchema.js";
import MasterUserProfileSchema from "../models/master/MasterUserProfileSchema.js";

// # =========================================================================

// // # =====================
// // # Sequelize Configuration
// // # =====================

const sequelize = new Sequelize(
  envIdentityConfig.DB_NAME,
  envIdentityConfig.DB_USER,
  envIdentityConfig.DB_PASSWORD,
  {
    host: envIdentityConfig.DB_HOST,
    dialect: envIdentityConfig.DB_DIALECT,
    port: envIdentityConfig.DB_PORT,
    logging: envIdentityConfig.DB_LOGGING === "true" ? console.log : false,
    connectionLimit: envIdentityConfig.DB_CONNECT_LIMIT,
    acquireTimeout: envIdentityConfig.DB_ACQUIRE_TIMEOUT,
    waitForConnections: envIdentityConfig.DB_WAIT_FOR_CONNECTION,
    charset: envIdentityConfig.DB_CHARSET,
    pool: {
      max: Number(envIdentityConfig.DB_POOL_MAX),
      min: Number(envIdentityConfig.DB_POOL_MIN),
      acquire: Number(envIdentityConfig.DB_POOL_ACQUIRE),
      idle: Number(envIdentityConfig.DB_POOL_IDLE),
    },
  }
);

// # =====================
// # Database Model Initialization Configuration
// # =====================

const models = {
  MasterDashboardSections: MasterDashboardSectionsSchema(
    sequelize,
    Sequelize.DataTypes
  ),
  MasterRole: MasterRoleSchema(sequelize, Sequelize.DataTypes),
  MasterRoleDashboardSection: MasterRoleDashboardSectionSchema(
    sequelize,
    Sequelize.DataTypes
  ),
  MasterUser: MasterUserSchema(sequelize, Sequelize.DataTypes),
  MasterUserProfile: MasterUserProfileSchema(sequelize, Sequelize.DataTypes),
};

const identityDB = {
  Sequelize,
  sequelize,
  ...models,
};

// // # =====================
// // # Define Database Model Associations
// // # =====================

// Object.keys(identityDB).forEach((modelName) => {
//   if (identityDB[modelName]?.associate) {
//     identityDB[modelName].associate(identityDB);
//   }
// });

// # =====================
// # Database Synchronization
// # =====================

const syncIdentityDB = async () => {
  try {
    await identityDB.MasterDashboardSections.sync();
    await identityDB.MasterRole.sync();
    await identityDB.MasterRoleDashboardSection.sync();
    await identityDB.MasterUser.sync();
    await identityDB.MasterUserProfile.sync();

    console.log("✅ All Identity Service Models synchronized successfully");
    return true;
  } catch (error) {
    console.error("❌ Identity Service Models synchronized failed:", error);
    throw error;
  }
};

// // # =====================
// // # Database Synchronization and Initial Data Seeding
// // # =====================

const initializeIdentityDB = async () => {
  try {
    await identityDB.sequelize.authenticate();
    console.log("✅ Identity Database connected successfully.");

    await syncIdentityDB();

    // Seed initial roles if none exist
    const roles = await identityDB.MasterRole.findAll();

    let defaultHostRole; // Declare the defaultHostRole variable outside the conditional

    if (roles.length === 0) {
      const createdRoles = await identityDB.MasterRole.bulkCreate(
        [
          {
            name: envIdentityConfig.DEFAULT_ROLE,
            description: "Role to manage entire application.",
            createdBy: envIdentityConfig.HOST_FIRST_NAME,
          },
          {
            name: "Content Manager",
            description: "Role to manage content only.",
            createdBy: envIdentityConfig.HOST_FIRST_NAME,
          },
        ],
        {
          returning: true, // Ensure that the inserted rows are returned
        }
      );

      defaultHostRole = createdRoles[0]; // Assign the first created role to defaultHostRole

      console.log("Roles created successfully");
    } else {
      // If roles already exist, assign defaultHostRole from the existing roles
      defaultHostRole = roles.find(
        (role) => role.name === envIdentityConfig.DEFAULT_ROLE
      );
      if (!defaultHostRole) {
        // If the default role does not exist, create it and assign it
        const createdRole = await identityDB.MasterRole.create({
          name: envIdentityConfig.DEFAULT_ROLE,
          description: "Role to manage entire application.",
          createdBy: envIdentityConfig.HOST_FIRST_NAME,
        });
        defaultHostRole = createdRole;
        console.log("Default role created.");
      }
    }

    // Create the default dashboard section if not exists
    const defaultDashboardSection =
      await identityDB.MasterDashboardSections.findOne({
        where: {
          sectionName: envIdentityConfig.DEFAULT_MASTER_DASHBOARD_SECTION,
        },
      });

    if (!defaultDashboardSection) {
      await identityDB.MasterDashboardSections.create({
        sectionName: envIdentityConfig.DEFAULT_MASTER_DASHBOARD_SECTION,
        description:
          "Section to manage the Master Dashboard's Sections and their permissions.",
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        code: "manage_dashboard_sections",
      });
      console.log(
        "Default dashboard section 'Manage Dashboard Sections' created."
      );
    }

    // Fetch the created section
    const createdSection = await identityDB.MasterDashboardSections.findOne({
      where: {
        sectionName: envIdentityConfig.DEFAULT_MASTER_DASHBOARD_SECTION,
      },
    });

    // Assign the default dashboard section to the default role
    const existingAssignment =
      await identityDB.MasterRoleDashboardSection.findOne({
        where: {
          roleId: defaultHostRole.id,
          dashboardSectionId: createdSection.id,
        },
      });

    console.log("existingAssignment", existingAssignment);

    if (!existingAssignment) {
      await identityDB.MasterRoleDashboardSection.create({
        roleId: defaultHostRole.id,
        dashboardSectionId: createdSection.id,
      });
      console.log(
        "Default role assigned to 'Manage Dashboard Sections' section."
      );
    }

    // Seed admin user if none exists
    const adminUser = await identityDB.MasterUser.findOne({
      where: { email: envIdentityConfig.HOST_EMAIL },
    });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(
        envIdentityConfig.HOST_PASSWORD,
        10
      );
      const createdUser = await identityDB.MasterUser.create({
        firstName: envIdentityConfig.HOST_FNAME,
        lastName: envIdentityConfig.HOST_LNAME,
        email: envIdentityConfig.HOST_EMAIL,
        password: hashedPassword,
        isActive: true,
      });

      if (createdUser) {
        // Create user profile
        await identityDB.MasterUserProfile.create({
          userId: createdUser.id,
          roleIds: [defaultHostRole.id], // Assign the default role
          isHost: true,
        });
      }
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("❌ Identity Database initialization failed:", error);
    process.exit(1);
  }
};

export { identityDB, initializeIdentityDB };
