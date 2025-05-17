import { Op } from "sequelize";
import { subscriptionCatalogDB } from "../../config/db.config.js";
import { RESPONSE_ERROR_MESSAGES } from "../../constants/index.js";
import { generateNameByDisplayName } from "../../utils/index.js";
const {
  OrganizationModule,
  OrganizationModuleSubmodule,
  OrganizationSubmodule,
} = subscriptionCatalogDB;

export const insertModuleService = async (moduleData) => {
  const {
    displayName,
    description,
    icon,
    subModuleIds = [],
    createdBy,
  } = moduleData;

  const moduleName = await generateNameByDisplayName(displayName);
  const moduleExists = await OrganizationModule.findOne({
    where: { name: moduleName, isDeleted: false },
  });
  if (moduleExists) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_MODULE.MODULE_ALREADY_EXISTS
    );
  }
  const newModule = await OrganizationModule.create({
    name: moduleName,
    displayName,
    description,
    icon,
    createdBy,
  });

  if (subModuleIds.length > 0) {
    const bulkLinkData = subModuleIds.map((subModuleId) => ({
      moduleId: newModule.id,
      subModuleId: subModuleId,
    }));
    await OrganizationModuleSubmodule.bulkCreate(bulkLinkData);
  }
  console.log("newModule", newModule);
  return { newModule };
};

export const updateModuleService = async (params, body) => {
  const { id } = params;
  const { displayName, description, icon, subModuleIds, modifiedBy } = body;

  const moduleName = await generateNameByDisplayName(displayName);

  // Check for name conflict with other modules
  const moduleConflict = await OrganizationModule.findOne({
    where: {
      name: moduleName,
      id: { [Op.ne]: id },
      isDeleted: false,
    },
  });
  if (moduleConflict) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_MODULE.MODULE_ALREADY_EXISTS
    );
  }

  // ✅ Get the actual module to update
  const moduleToUpdate = await OrganizationModule.findOne({
    where: { id },
  });
  if (!moduleToUpdate) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_MODULE.MODULE_NOT_FOUND
    );
  }

  // Update fields
  moduleToUpdate.name = moduleName;
  moduleToUpdate.displayName = displayName;
  moduleToUpdate.description = description;
  moduleToUpdate.icon = icon;
  moduleToUpdate.modifiedBy = modifiedBy;
  moduleToUpdate.modifiedDate = new Date();

  if (subModuleIds.length > 0) {
    await OrganizationModuleSubmodule.destroy({
      where: { moduleId: id },
    });
    const bulkLinkData = subModuleIds.map((subModuleId) => ({
      moduleId: id,
      subModuleId: subModuleId,
    }));
    await OrganizationModuleSubmodule.bulkCreate(bulkLinkData);
  }

  const updatedModule = await moduleToUpdate.save();

  console.log("updatedModule", updatedModule);
  return { updatedModule };
};

export const deleteModuleService = async (params, body) => {
  const { id } = params;
  const { modifiedBy } = body;

  const moduleExists = await OrganizationModule.findOne({
    where: { id },
  });
  if (!moduleExists) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_MODULE.MODULE_NOT_FOUND
    );
  }

  //Update the Module to perform soft delete
  const updatedModule = await OrganizationModule.update(
    {
      name: `${moduleExists.name}_arc_${new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 14)}`, // Appending timestamp to name
      isDeleted: true,
      modifiedBy: modifiedBy || moduleExists.modifiedBy, // Update modifiedBy if provided
      modifiedDate: new Date(), // Set current timestamp
    },
    {
      where: { id },
    }
  );

  await OrganizationModuleSubmodule.destroy({
    where: { moduleId: id },
  });

  //Todo: to delete from rolemodule tables as well from each organization seperate schema

  return { updatedModule };
};

export const getModuleByIdService = async (params) => {
  const { id } = params;

  const module = await OrganizationModule.findOne({
    where: { id, isDeleted: false },
    attributes: [
      "id",
      "name",
      "displayName",
      "description",
      "createdBy",
      "createdDate",
      "modifiedBy",
      "modifiedDate",
    ],
  });
  if (!module) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_MODULE.MODULE_NOT_FOUND
    );
  }

  const subModuleIds = await OrganizationModuleSubmodule.findAll({
    attributes: ["subModuleId"],
    where: { moduleId: id },
  });

  const subModules = await OrganizationSubmodule.findAll({
    attributes: [
      "id",
      "name",
      "displayName",
      "description",
      "createdBy",
      "createdDate",
      "modifiedBy",
      "modifiedDate",
    ],
    where: {
      id: subModuleIds.map((subModule) => subModule.subModuleId),
      isDeleted: false,
    },
  });

  const moduleWithSubModules = {
    ...module.dataValues,
    subModules: subModules,
  };
  return { module: moduleWithSubModules };
};

export const getAllModulesService = async () => {
  const modules = await OrganizationModule.findAll({
    attributes: [
      "id",
      "name",
      "displayName",
      "description",
      "createdBy",
      "createdDate",
      "modifiedBy",
      "modifiedDate",
    ],
    where: {
      isDeleted: false,
    },
    order: [
      ["createdDate", "ASC"],
      ["id", "ASC"],
    ],
  });

  const allModulesWithSubModules = await Promise.all(
    modules.map(async (module) => {
      const subModuleIds = await OrganizationModuleSubmodule.findAll({
        attributes: ["subModuleId"],
        where: { moduleId: module.id },
      });

      // default with empty subModules array
      let moduleWithSubModules = {
        ...module.dataValues,
        subModules: [],
      };

      if (subModuleIds.length) {
        const subModules = await OrganizationSubmodule.findAll({
          attributes: [
            "id",
            "name",
            "displayName",
            "description",
            "createdBy",
            "createdDate",
            "modifiedBy",
            "modifiedDate",
          ],
          where: {
            id: subModuleIds.map((subModule) => subModule.subModuleId),
            isDeleted: false,
          },
        });

        moduleWithSubModules = {
          ...module.dataValues,
          subModules,
        };
      }

      return moduleWithSubModules;
    })
  );

  return { modules: allModulesWithSubModules };
};
