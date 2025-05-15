import express from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
} from "../constants/index.js";

const authenticatedRoute = express.Router();

authenticatedRoute.use(async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return errorResponse(
        res,
        RESPONSE_STATUS_CODES.UNAUTHORIZED,
        RESPONSE_MESSAGES.UNAUTHORIZED
      );
    }

    const [authType, authToken] = token.split(" ");
    if (authType.toLowerCase() !== "bearer") {
      return errorResponse(
        res,
        RESPONSE_STATUS_CODES.UNAUTHORIZED,
        RESPONSE_MESSAGES.UNAUTHORIZED
      );
    }
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return errorResponse(
        res,
        RESPONSE_STATUS_CODES.UNAUTHORIZED,
        RESPONSE_MESSAGES.UNAUTHORIZED
      );
    }
    req.userId = decodedToken.id;
    req.organization = decodedToken.organization;
    next();
  } catch (error) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.UNAUTHORIZED,
      RESPONSE_MESSAGES.UNAUTHORIZED
    );
  }
});

export default authenticatedRoute;
