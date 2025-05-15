import { errorResponse, successResponse } from "../utils/response.js";
import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  RESPONSE_SUCCESS_MESSAGES,
} from "../constants/index.js";
import { getProfileService } from "../services/account-service.js";

export const getProfile = async (req, res) => {
  try {
    const { user } = await getProfileService(req.userId, req.organization);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.USER.GET_PROFILE_SUCCESS,
      { user }
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
