import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
} from "../constants/index.js";

const sendResponse = (
  res,
  responseStatusCode,
  responseMessage,
  message,
  data,
  error
) => {
  const response = {
    status: {
      response_code: responseStatusCode,
      response_message: responseMessage,
    },
    message,
  };

  if (data) {
    response.data = data;
  }

  if (error) {
    response.error = error;
  }

  return res.status(responseStatusCode).json(response);
};

export const successResponse = (
  res,
  responseStatusCode = RESPONSE_STATUS_CODES.OK,
  responseMessage = RESPONSE_MESSAGES.SUCCESS,
  message,
  data = {}
) => {
  return sendResponse(res, responseStatusCode, responseMessage, message, data);
};

export const errorResponse = (
  res,
  responseStatusCode = RESPONSE_STATUS_CODES.BAD_REQUEST,
  responseMessage = RESPONSE_MESSAGES.BAD_REQUEST,
  message,
  error = null
) => {
  return sendResponse(res, responseStatusCode, responseMessage, message, error);
};
