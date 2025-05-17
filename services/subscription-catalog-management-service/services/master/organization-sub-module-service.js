import { Op } from "sequelize";
import { subscriptionCatalogDB } from "../../config/db.config.js";
import { RESPONSE_ERROR_MESSAGES } from "../../constants/index.js";
import { generateNameByDisplayName } from "../../utils/index.js";
const { OrganizationSubmodule, OrganizationModuleSubmodule } =
  subscriptionCatalogDB;

export const insertSubModuleService = async (subModuleData) => {
  const { displayName, description, icon, createdBy } = subModuleData;

  const subModuleName = await generateNameByDisplayName(displayName);
  const subModuleExists = await OrganizationSubmodule.findOne({
    where: { name: subModuleName, isDeleted: false },
  });
  if (subModuleExists) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_SUBMODULE.SUBMODULE_ALREADY_EXISTS
    );
  }
  const newSubModule = await OrganizationSubmodule.create({
    name: subModuleName,
    displayName,
    description,
    icon,
    createdBy,
  });
  console.log("newsubModule", newSubModule);
  return { newSubModule };
};

export const updateSubModuleService = async (params, body) => {
  const { id } = params;
  const { displayName, description, icon, modifiedBy } = body;

  const subModuleName = await generateNameByDisplayName(displayName);

  // Check for name conflict with other submodules
  const subModuleConflict = await OrganizationSubmodule.findOne({
    where: {
      name: subModuleName,
      id: { [Op.ne]: id },
      isDeleted: false,
    },
  });
  if (subModuleConflict) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_SUBMODULE.SUBMODULE_ALREADY_EXISTS
    );
  }

  // ✅ Get the actual submodule to update
  const subModuleToUpdate = await OrganizationSubmodule.findOne({
    where: { id },
  });
  if (!subModuleToUpdate) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_SUBMODULE.SUBMODULE_NOT_FOUND
    );
  }

  // Update fields
  subModuleToUpdate.name = subModuleName;
  subModuleToUpdate.displayName = displayName;
  subModuleToUpdate.description = description;
  subModuleToUpdate.icon = icon;
  subModuleToUpdate.modifiedBy = modifiedBy;
  subModuleToUpdate.modifiedDate = new Date();

  const updatedSubModule = await subModuleToUpdate.save();

  console.log("updatedsubModule", updatedSubModule);
  return { updatedSubModule };
};

export const deleteSubModuleService = async (params, body) => {
  const { id } = params;
  const { modifiedBy } = body;

  const subModuleExists = await OrganizationSubmodule.findOne({
    where: { id },
  });
  if (!subModuleExists) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_SUBMODULE.SUBMODULE_NOT_FOUND
    );
  }

  //Update the subModule to perform soft delete
  const updatedsubModule = await OrganizationSubmodule.update(
    {
      name: `${subModuleExists.name}_arc_${new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 14)}`, // Appending timestamp to name
      isDeleted: true,
      modifiedBy: modifiedBy || subModuleExists.modifiedBy, // Update modifiedBy if provided
      modifiedDate: new Date(), // Set current timestamp
    },
    {
      where: { id },
    }
  );

  await OrganizationModuleSubmodule.destroy({
    where: { subModuleId: id },
  });

  //Todo: to delete from roleSubmodule tables as well from each organization seperate schema

  return { updatedsubModule };
};

export const getSubModuleByIdService = async (params) => {
  const { id } = params;
  const subModule = await OrganizationSubmodule.findOne({
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
  if (!subModule) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_SUBMODULE.SUBMODULE_NOT_FOUND
    );
  }

  return { subModule };
};

export const getAllSubModulesService = async () => {
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
      isDeleted: false,
    },
    order: [
      ["createdDate", "ASC"],
      ["id", "ASC"],
    ],
  });
  return { subModules };
};
