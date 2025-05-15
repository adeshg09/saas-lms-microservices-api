import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  RESPONSE_SUCCESS_MESSAGES,
} from "../../constants/index.js";
import {
  deleteRoleService,
  getAllRolesService,
  getRoleByIdService,
  insertRoleService,
  updateRoleService,
} from "../../services/master/master-role-service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const insertRole = async (req, res) => {
  try {
    const { newRole } = await insertRoleService(req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ROLE.INSERT_SUCCESS,
      { id: newRole.id }
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

export const updateRole = async (req, res) => {
  try {
    const { updatedRole } = await updateRoleService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ROLE.UPDATE_SUCCESS,
      { id: updatedRole.id }
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

export const deleteRole = async (req, res) => {
  try {
    await deleteRoleService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ROLE.DELETE_SUCCESS
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

export const getRoleById = async (req, res) => {
  try {
    const { role } = await getRoleByIdService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ROLE.GET_SUCCESS,
      { role }
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

export const getAllRoles = async (req, res) => {
  try {
    const { roles } = await getAllRolesService();
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ROLE.GET_ALL_SUCCESS,
      { roles }
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
