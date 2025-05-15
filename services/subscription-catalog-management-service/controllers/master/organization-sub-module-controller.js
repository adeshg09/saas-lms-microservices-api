import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  RESPONSE_SUCCESS_MESSAGES,
} from "../../constants/index.js";
// import {
//   deleteSubModuleService,
//   generateSubModuleService,
//   getAllSubModulesService,
//   getSubModuleByIdService,
//   insertSubModuleService,
//   updateSubModuleService,
// } from "../../services/master/master-dashboard-sections-service.js";

import { errorResponse, successResponse } from "../../utils/response.js";

export const insertSubModule = async (req, res) => {
  try {
    const { newSubModule } = await insertSubModuleService(req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_SUBMODULE.INSERT_SUCCESS,
      { id: newSubModule.id }
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

export const updateSubModule = async (req, res) => {
  try {
    const { updatedSubModule } = await updateSubModuleService(
      req.params,
      req.body
    );
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_SUBMODULE.UPDATE_SUCCESS,
      { id: updatedSubModule.id }
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

export const deleteSubModule = async (req, res) => {
  try {
    await deleteSubModuleService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_SUBMODULE.DELETE_SUCCESS
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

export const getSubModuleById = async (req, res) => {
  try {
    const { subModule } = await getSubModuleByIdService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_SUBMODULE.GET_SUCCESS,
      { subModule }
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

export const getAllSubModules = async (req, res) => {
  try {
    const { subModules } = await getAllSubModulesService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_SUBMODULE.GET_ALL_SUCCESS,
      { subModules }
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
