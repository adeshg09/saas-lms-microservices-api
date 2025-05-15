import { errorResponse, successResponse } from "../utils/response.js";
import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  RESPONSE_SUCCESS_MESSAGES,
} from "../constants/index.js";
import {
  loginUserService,
  resetPasswordService,
  sendForgotPasswordLinkService,
} from "../services/auth-service.js";

//--------Login User ------------------
export const loginUser = async (req, res) => {
  try {
    const { token } = await loginUserService(req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
      { token }
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

//--------Forgot Password ---------------
export const forgotPassword = async (req, res) => {
  try {
    await sendForgotPasswordLinkService(req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.AUTH.EMAIL_SUCCESS.RESET_PASSWORD
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

//--------Reset Password ---------------
export const resetPassword = async (req, res) => {
  try {
    await resetPasswordService(req.body);
    return successResponse(
      res,
      RESPONSE_STATUS_CODES.OK,
      RESPONSE_MESSAGES.SUCCESS,
      RESPONSE_SUCCESS_MESSAGES.AUTH.RESET_PASSWORD_SUCCESS
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
