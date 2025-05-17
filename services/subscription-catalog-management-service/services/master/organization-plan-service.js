import { Op } from "sequelize";
import { subscriptionCatalogDB } from "../../config/db.config.js";
import { RESPONSE_ERROR_MESSAGES } from "../../constants/index.js";
import { generateNameByDisplayName } from "../../utils/index.js";
const { OrganizationPlan } = subscriptionCatalogDB;

export const insertPlanService = async (planData) => {
  const {
    displayName,
    description,
    price,
    durationInMonths,
    code,
    moduleIds,
    maxUsers,
    maxRoles,
    maxCourses,
    createdBy,
  } = planData;

  const planName = await generateNameByDisplayName(displayName);
  const planExists = await OrganizationPlan.findOne({
    where: { name: planName, isDeleted: false },
  });
  if (planExists) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_PLAN.PLAN_ALREADY_EXISTS
    );
  }
  const newPlan = await OrganizationPlan.create({
    name: planName,
    displayName,
    description,
    price,
    durationInMonths,
    code,
    moduleIds,
    maxUsers,
    maxRoles,
    maxCourses,
    createdBy,
  });

  console.log("newPlan", newPlan);
  return { newPlan };
};

export const updatePlanService = async (params, body) => {
  const { id } = params;
  const {
    displayName,
    description,
    price,
    durationInMonths,
    code,
    moduleIds,
    maxUsers,
    maxRoles,
    maxCourses,
    modifiedBy,
  } = body;

  const planName = await generateNameByDisplayName(displayName);

  // Check for name conflict with other Plans
  const planConflict = await OrganizationPlan.findOne({
    where: {
      name: planName,
      id: { [Op.ne]: id },
      isDeleted: false,
    },
  });
  if (planConflict) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.ORGANIZATION_PLAN.PLAN_ALREADY_EXISTS
    );
  }

  // ✅ Get the actual Plan to update
  const planToUpdate = await OrganizationPlan.findOne({
    where: { id },
  });
  if (!planToUpdate) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ORGANIZATION_PLAN.PLAN_NOT_FOUND);
  }

  // Update fields
  planToUpdate.name = planName;
  planToUpdate.displayName = displayName;
  planToUpdate.description = description;
  planToUpdate.price = price;
  planToUpdate.durationInMonths = durationInMonths;
  planToUpdate.code = code;
  planToUpdate.moduleIds = moduleIds;
  planToUpdate.maxUsers = maxUsers;
  planToUpdate.maxRoles = maxRoles;
  planToUpdate.maxCourses = maxCourses;
  planToUpdate.modifiedBy = modifiedBy || planToUpdate.modifiedBy;
  planToUpdate.modifiedDate = new Date();

  const updatedPlan = await planToUpdate.save();

  console.log("updatedPlan", updatedPlan);
  return { updatedPlan };
};

export const deletePlanService = async (params, body) => {
  const { id } = params;
  const { modifiedBy } = body;

  const planExists = await OrganizationPlan.findOne({
    where: { id },
  });
  if (!planExists) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ORGANIZATION_PLAN.PLAN_NOT_FOUND);
  }

  //Update the Plan to perform soft delete
  const updatedPlan = await OrganizationPlan.update(
    {
      name: `${planExists.name}_arc_${new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 14)}`, // Appending timestamp to name
      isDeleted: true,
      modifiedBy: modifiedBy || planExists.modifiedBy, // Update modifiedBy if provided
      modifiedDate: new Date(), // Set current timestamp
    },
    {
      where: { id },
    }
  );

  //Todo: to delete related to organization schema

  return { updatedPlan };
};

export const getPlanByIdService = async (params) => {
  const { id } = params;
  const plan = await OrganizationPlan.findOne({
    where: { id, isDeleted: false },
    attributes: [
      "id",
      "name",
      "displayName",
      "description",
      "price",
      "durationInMonths",
      "code",
      "moduleIds",
      "maxUsers",
      "maxRoles",
      "maxCourses",
      "createdBy",
      "createdDate",
      "modifiedBy",
      "modifiedDate",
    ],
  });
  if (!plan) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ORGANIZATION_PLAN.PLAN_NOT_FOUND);
  }

  return { plan };
};

export const getAllPlansService = async () => {
  const plans = await OrganizationPlan.findAll({
    attributes: [
      "id",
      "name",
      "displayName",
      "description",
      "price",
      "durationInMonths",
      "code",
      "moduleIds",
      "maxUsers",
      "maxRoles",
      "maxCourses",
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
  return { plans };
};
