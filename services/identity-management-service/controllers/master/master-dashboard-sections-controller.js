import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  RESPONSE_SUCCESS_MESSAGES,
} from "../../constants/index.js";
import {
  deleteDashboardSectionService,
  generateDashboardSectionService,
  getAllDashboardSectionsService,
  getDashboardSectionByIdService,
  insertDashboardSectionService,
  updateDashboardSectionService,
} from "../../services/master/master-dashboard-sections-service.js";

import { errorResponse, successResponse } from "../../utils/response.js";

export const insertDashboardSection = async (req, res) => {
  try {
    const { newSection } = await insertDashboardSectionService(req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.DASHBOARD_SECTION.MASTER.INSERT_SUCCESS,
      { id: newSection.id }
    );
  } catch (error) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.SERVER_ERROR,
      RESPONSE_MESSAGES.SERVER_ERROR,
      error.message,
      error
    );
  }
};

export const updateDashboardSection = async (req, res) => {
  try {
    const { updatedSection } = await updateDashboardSectionService(
      req.params,
      req.body
    );
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.DASHBOARD_SECTION.MASTER.UPDATE_SUCCESS,
      { id: updatedSection.id }
    );
  } catch (error) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.SERVER_ERROR,
      RESPONSE_MESSAGES.SERVER_ERROR,
      error.message,
      error
    );
  }
};

export const deleteDashboardSection = async (req, res) => {
  try {
    await deleteDashboardSectionService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.DASHBOARD_SECTION.MASTER.DELETE_SUCCESS
    );
  } catch (error) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.SERVER_ERROR,
      RESPONSE_MESSAGES.SERVER_ERROR,
      error.message,
      error
    );
  }
};

export const getDashboardSectionById = async (req, res) => {
  try {
    const { section } = await getDashboardSectionByIdService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.DASHBOARD_SECTION.MASTER.GET_SUCCESS,
      { section }
    );
  } catch (error) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.SERVER_ERROR,
      RESPONSE_MESSAGES.SERVER_ERROR,
      error.message,
      error
    );
  }
};

export const getAllDashboardSections = async (req, res) => {
  try {
    const { dashboardSections } = await getAllDashboardSectionsService(
      req.params
    );
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.DASHBOARD_SECTION.MASTER.GET_ALL_SUCCESS,
      { dashboardSections }
    );
  } catch (error) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.SERVER_ERROR,
      RESPONSE_MESSAGES.SERVER_ERROR,
      error.message,
      error
    );
  }
};

export const generateDashboardSectionCode = async (req, res) => {
  try {
    const { generatedSectionCode } = await generateDashboardSectionService(
      req.body
    );
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.DASHBOARD_SECTION.MASTER.GENERATE_CODE_SUCCESS,
      { sectionCode: generatedSectionCode }
    );
  } catch (error) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.SERVER_ERROR,
      RESPONSE_MESSAGES.SERVER_ERROR,
      error.message,
      error
    );
  }
};
