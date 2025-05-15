import { Op } from "sequelize";
import { identityDB } from "../../config/db.config.js";
import { RESPONSE_ERROR_MESSAGES } from "../../constants/index.js";
const { MasterRole, MasterUserProfile, MasterRoleDashboardSection } =
  identityDB;

export const insertRoleService = async (roleData) => {
  const { name, description, createdBy, dashboardSectionIds } = roleData;
  const roleExists = await MasterRole.findOne({ where: { name } });
  if (roleExists) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ROLE.ROLE_ALREADY_EXISTS);
  }
  const newRole = await MasterRole.create({
    name,
    description,
    createdBy,
  });

  // Assign the dashboard sections to the newly created role
  if (dashboardSectionIds && dashboardSectionIds.length > 0) {
    // Prepare the dashboard section assignments
    const dashboardAssignments = dashboardSectionIds.map((sectionId) => ({
      roleId: newRole.id,
      dashboardSectionId: sectionId,
    }));

    // Insert the assignments into the MasterRoleDashboardSection table
    await MasterRoleDashboardSection.bulkCreate(dashboardAssignments);
    console.log(
      `Assigned ${dashboardSectionIds.length} dashboard sections to the role ${name}.`
    );
  }
  return { newRole };
};

export const updateRoleService = async (params, body) => {
  const { id } = params;
  const { name, description, modifiedBy } = body;

  const roleExists = await MasterRole.findOne({ where: { id } });
  if (!roleExists) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ROLE.ROLE_NOT_FOUND);
  }

  roleExists.name = name;
  roleExists.description = description;
  roleExists.modifiedBy = modifiedBy;

  const updatedRole = await roleExists.save();
  console.log("updatedRole", updatedRole);
  return { updatedRole };
};

export const deleteRoleService = async (params, body) => {
  const { id } = params;
  const { modifiedBy } = body;

  const roleExists = await MasterRole.findOne({ where: { id } });
  if (!roleExists) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ROLE.ROLE_NOT_FOUND);
  }

  //Update the role to perform soft delete
  const updatedRole = await MasterRole.update(
    {
      name: `${roleExists.name}_arc_${new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 14)}`, // Appending timestamp to name
      isDeleted: true,
      modifiedBy: modifiedBy || roleExists.modifiedBy, // Update modifiedBy if provided
      modifiedDate: new Date(), // Set current timestamp
    },
    {
      where: { id },
    }
  );

  const profiles = await MasterUserProfile.findAll({
    where: {
      roleIds: {
        [Op.contains]: [id],
      },
    },
  });

  for (const profile of profiles) {
    const updatedRoleIds = profile.roleIds.filter((roleId) => roleId !== id);
    await profile.update({
      roleIds: updatedRoleIds,
      modifiedBy: modifiedBy || profile.modifiedBy,
      modifiedDate: new Date(),
    });
  }
  console.log("updatedRole", updatedRole);
  return updatedRole;
};

export const getRoleByIdService = async (params) => {
  const { id } = params;
  const role = await MasterRole.findOne({
    where: { id, isDeleted: false },
    attributes: [
      "id",
      "name",
      "description",
      "createdBy",
      "createdDate",
      "modifiedBy",
      "modifiedDate",
    ],
  });
  if (!role) {
    throw new Error(RESPONSE_ERROR_MESSAGES.ROLE.ROLE_NOT_FOUND);
  }

  return { role };
};

export const getAllRolesService = async () => {
  const roles = await MasterRole.findAll({
    attributes: [
      "id",
      "name",
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
  return { roles };
};
