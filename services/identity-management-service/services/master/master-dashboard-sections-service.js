import { identityDB } from "../../config/db.config.js";
import { RESPONSE_ERROR_MESSAGES } from "../../constants/index.js";
import { generateDashboardCode } from "../../utils/index.js";
const { MasterDashboardSections, MasterRoleDashboardSection } = identityDB;

export const insertDashboardSectionService = async (sectionData) => {
  const {
    sectionName,
    description,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
    code,
  } = sectionData;
  const sectionExists = await MasterDashboardSections.findOne({
    where: { sectionName },
  });
  if (sectionExists) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.DASHBOARD_SECTION.MASTER.SECTION_ALREADY_EXISTS
    );
  }
  const newSection = await MasterDashboardSections.create({
    sectionName,
    description,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
    code,
  });
  console.log("newSection", newSection);
  return { newSection };
};

export const updateDashboardSectionService = async (params, body) => {
  const { id } = params;
  const {
    sectionName,
    description,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
    code,
  } = body;
  const sectionExists = await MasterDashboardSections.findOne({
    where: { sectionName },
  });
  if (sectionExists && sectionExists.id !== parseInt(id)) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.DASHBOARD_SECTION.MASTER.SECTION_ALREADY_EXISTS
    );
  }

  await sectionExists.update({
    sectionName,
    description,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
    code,
  });

  console.log("updatedSection", sectionExists);
  return { updatedSection: sectionExists };
};

export const deleteDashboardSectionService = async (params, body) => {
  const { id } = params;
  const { modifiedBy } = body;

  const sectionExists = await MasterDashboardSections.findOne({
    where: { id },
  });
  if (!sectionExists) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.DASHBOARD_SECTION.MASTER.SECTION_NOT_FOUND
    );
  }

  //Update the section to perform soft delete
  const updatedSection = await MasterDashboardSections.update(
    {
      name: `${sectionExists.sectionName}_arc_${new Date()
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

  return { updatedSection };
};

export const getDashboardSectionByIdService = async (params) => {
  const { id } = params;
  const section = await MasterDashboardSections.findOne({
    where: { id, isDeleted: false },
    raw: true,
  });
  if (!section) {
    throw new Error(
      RESPONSE_ERROR_MESSAGES.DASHBOARD_SECTION.MASTER.SECTION_NOT_FOUND
    );
  }
  return { section };
};

export const getAllDashboardSectionsService = async (params) => {
  const dashboardSections = await MasterDashboardSections.findAll({
    where: { isDeleted: false },
    raw: true,
    order: [
      ["createdDate", "ASC"],
      ["id", "ASC"],
    ],
  });

  return { dashboardSections };
};

export const generateDashboardSectionService = async (sectionData) => {
  const { sectionName, canCreate, canRead, canUpdate, canDelete } = sectionData;

  if (!sectionName) {
    throw new Error("Section name is required");
  }

  const generatedSectionCode = generateDashboardCode(sectionName, {
    canCreate,
    canRead,
    canUpdate,
    canDelete,
  });

  return { generatedSectionCode };
};
