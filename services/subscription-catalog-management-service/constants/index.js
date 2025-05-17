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
  ORGANIZATION_MODULE: {
    INSERT_SUCCESS: "Module Inserted Successfully",
    UPDATE_SUCCESS: "Module Updated Successfully",
    DELETE_SUCCESS: "Module Deleted Successfully",
    GET_SUCCESS: "Module Retrieved Successfully",
    GET_ALL_SUCCESS: "All Modules Retrieved Successfully",
  },
  ORGANIZATION_PLAN: {
    INSERT_SUCCESS: "Plan Inserted Successfully",
    UPDATE_SUCCESS: "Plan Updated Successfully",
    DELETE_SUCCESS: "Plan Deleted Successfully",
    GET_SUCCESS: "Plan Retrieved Successfully",
    GET_ALL_SUCCESS: "All Plans Retrieved Successfully",
  },
};

export const RESPONSE_ERROR_MESSAGES = {
  ORGANIZATION_SUBMODULE: {
    SUBMODULE_NOT_FOUND: "SubModule not found!",
    SUBMODULE_ALREADY_EXISTS: "SubModule already exists!",
  },
  ORGANIZATION_MODULE: {
    MODULE_NOT_FOUND: "Module not found!",
    MODULE_ALREADY_EXISTS: "Module already exists!",
  },
  ORGANIZATION_PLAN: {
    PLAN_NOT_FOUND: "Plan not found!",
    PLAN_ALREADY_EXISTS: "Plan already exists!",
  },
  ORGANIZATION: {
    ORGANIZATION_NOT_FOUND: "Organization not found!",
  },
};
