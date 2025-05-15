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
  DASHBOARD_SECTION: {
    MASTER: {
      INSERT_SUCCESS: "Dashboard Section Inserted Successfully",
      UPDATE_SUCCESS: "Dashboard Section Updated Successfully",
      DELETE_SUCCESS: "Dashboard Section Deleted Successfully",
      GET_SUCCESS: "Dashboard Section Retrieved Successfully",
      GET_ALL_SUCCESS: "All Dashboard Sections Retrieved Successfully",
      GENERATE_CODE_SUCCESS: "Dashboard Section Code generated Successfully",
    },
  },
  AUTH: {
    LOGIN_SUCCESS: "Login Successfull",
    RESET_PASSWORD_SUCCESS: "Password Reset Successfull",
    EMAIL_SUCCESS: {
      RESET_PASSWORD: "Reset Password Email Sent Successfully",
    },
  },
  USER: {
    REGISTER_SUCCESS: "User Registered Successfully",
    UPDATE_SUCCESS: "User Updated Successfully",
    DELETE_SUCCESS: "User Deleted Successfully",
    GET_SUCCESS: "User Retrieved Successfully",
    GET_ALL_SUCCESS: "All Users Retrieved Successfully",
    GET_PROFILE_SUCCESS: "User Profile Retrieved Successfully",
  },
  ROLE: {
    INSERT_SUCCESS: "Role Inserted Successfully",
    UPDATE_SUCCESS: "Role Updated Successfully",
    DELETE_SUCCESS: "Role Deleted Successfully",
    GET_SUCCESS: "Role Retrieved Successfully",
    GET_ALL_SUCCESS: "All Roles Retrieved Successfully",
  },
};

export const RESPONSE_ERROR_MESSAGES = {
  DASHBOARD_SECTION: {
    MASTER: {
      SECTION_ALREADY_EXISTS: "Section already exists!",
      SECTION_NOT_FOUND: "Section not found!",
    },
  },
  AUTH: {
    LOGIN_ERROR: "Email or Password is incorrect!",
    EMAIL_ERROR: {
      RESET_PASSWORD: "Error sending reset password email!",
      ALREADY_IN_USE: "Email already in use!",
    },
  },
  ROLE: {
    ROLE_NOT_FOUND: "Role not found!",
    ROLE_ALREADY_EXISTS: "Role already exists!",
  },
  USER: {
    USER_NOT_FOUND: "User not found!",
    USER_INACTIVE: "User is inActive!",
    USER_ALREADY_EXISTS: "User already exists!",
  },
  ORGANIZATION: {
    ORGANIZATION_NOT_FOUND: "Organization not found!",
  },
};

export const TOKEN_EXPIRY = {
  ACCESS: "1d",
  REFRESH: "7d",
  REMEMBER_ME: "30d",
  RESET_PASSWORD: "1h",
};
