import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  RESPONSE_SUCCESS_MESSAGES,
} from "../../constants/index.js";
import {
  deletePlanService,
  getAllPlansService,
  getPlanByIdService,
  insertPlanService,
  updatePlanService,
} from "../../services/master/organization-plan-service.js";

import { errorResponse, successResponse } from "../../utils/response.js";

export const insertPlan = async (req, res) => {
  try {
    const { newPlan } = await insertPlanService(req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_PLAN.INSERT_SUCCESS,
      { id: newPlan.id }
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

export const updatePlan = async (req, res) => {
  try {
    const { updatedPlan } = await updatePlanService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_PLAN.UPDATE_SUCCESS,
      { id: updatedPlan.id }
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

export const deletePlan = async (req, res) => {
  try {
    await deletePlanService(req.params, req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_PLAN.DELETE_SUCCESS
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

export const getPlanById = async (req, res) => {
  try {
    const { plan } = await getPlanByIdService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_PLAN.GET_SUCCESS,
      { plan }
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

export const getAllPlans = async (req, res) => {
  try {
    const { plans } = await getAllPlansService(req.params);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.ORGANIZATION_PLAN.GET_ALL_SUCCESS,
      { plans }
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
