export const RESPONSE_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGES = {
  SUCCESS: "Success!",
  BAD_REQUEST: "Bad Request!",
  UNAUTHORIZED: "Unauthorized!",
  FORBIDDEN: "Forbidden!",
  NOT_FOUND: "Not Found!",
  SERVER_ERROR: "Internal Server Error!",
};

export const RESPONSE_SUCCESS_MESSAGES = {
  ORGANIZATION_SUBMODULE: {
    INSERT_SUCCESS: "SubModule Inserted Successfully",
    UPDATE_SUCCESS: "SubModule Updated Successfully",
    DELETE_SUCCESS: "SubModule Deleted Successfully",
    GET_SUCCESS: "SubModule Retrieved Successfully",
    GET_ALL_SUCCESS: "All SubModules Retrieved Successfully",
  },
};

export const RESPONSE_ERROR_MESSAGES = {
  ORGANIZATION_SUBMODULE: {
    SUBMODULE_NOT_FOUND: "SubModule not found!",
    SUBMODULE_ALREADY_EXISTS: "SubModule already exists!",
  },
  ORGANIZATION: {
    ORGANIZATION_NOT_FOUND: "Organization not found!",
  },
};
