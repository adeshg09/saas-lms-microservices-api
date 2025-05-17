import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  RESPONSE_SUCCESS_MESSAGES,
} from "../../constants/index.js";
import {
  deleteModuleService,
  getAllModulesService,
  getModuleByIdService,
  insertModuleService,
  updateModuleService,
} from "../../services/master/organization-module-service.js";

import { errorResponse, successResponse } from "../../utils/response.js";

export const insertModule = async (req, res) => {
  try {
    const { newModule } = await insertModuleService(req.body);
    console.log("newModule in controller", newModule);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_MODULE.INSERT_SUCCESS,
      { id: newModule.id }
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

export const updateModule = async (req, res) => {
  try {
    const { updatedModule } = await updateModuleService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_MODULE.UPDATE_SUCCESS,
      { id: updatedModule.id }
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

export const deleteModule = async (req, res) => {
  try {
    await deleteModuleService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_MODULE.DELETE_SUCCESS
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

export const getModuleById = async (req, res) => {
  try {
    const { module } = await getModuleByIdService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_MODULE.GET_SUCCESS,
      { module }
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

export const getAllModules = async (req, res) => {
  try {
    const { modules } = await getAllModulesService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_MODULE.GET_ALL_SUCCESS,
      { modules }
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
