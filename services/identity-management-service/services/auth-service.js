import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { identityDB } from "../config/db.config.js";
import {
  RESPONSE_ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  RESPONSE_STATUS_CODES,
  TOKEN_EXPIRY,
} from "../constants/index.js";
import { envIdentityConfig } from "../config/env.config.js";
import { ResetPasswordMailContent } from "../utils/email-template.js";
import { gmailSmtpTransporter } from "../utils/email-service.js";
import { errorResponse } from "../utils/response.js";

const { MasterUser, MasterUserProfile } = identityDB;

export const loginUserService = async (loginData) => {
  const { email, password, rememberMe } = loginData;

  const userData = await MasterUser.findOne({ where: { email } });
  if (!userData) throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_NOT_FOUND);

  if (!userData.isActive) {
    throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_INACTIVE);
  }

  const isPasswordValid = await bcrypt.compare(password, userData.password);

  if (!isPasswordValid) {
    throw new Error(RESPONSE_ERROR_MESSAGES.AUTH.LOGIN_ERROR);
  }

  let organizationData = null;

  if (userData.organizationId) {
    organizationData = await getOrganizationById(userData.organizationId);

    if (!organizationData) {
      throw new Error(
        RESPONSE_ERROR_MESSAGES.ORGANIZATION.ORGANIZATION_NOT_FOUND
      );
    }
  }

  const payload = {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    organization: organizationData?.domainName,
  };

  const expiryTime =
    rememberMe == 1 ? TOKEN_EXPIRY.REMEMBER_ME : TOKEN_EXPIRY.ACCESS;

  const token = jwt.sign(payload, envIdentityConfig.JWT_SECRET_KEY, {
    expiresIn: expiryTime,
  });

  return { token };
};

export const sendForgotPasswordLinkService = async (forgotPasswordData) => {
  const { email, resetPasswordUrl } = forgotPasswordData;

  const userData = await MasterUser.findOne({ where: { email } });
  if (!userData) throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_NOT_FOUND);

  if (!userData.isActive) {
    throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_INACTIVE);
  }

  const resetPasswordToken = jwt.sign(
    {
      email: userData.email,
    },
    envIdentityConfig.RESET_PASSWORD_SECRET_JWT_KEY,
    {
      expiresIn: TOKEN_EXPIRY.RESET_PASSWORD,
    }
  );
  const link = `${resetPasswordUrl}${resetPasswordToken}`; //// frontend reset pass page url
  const name = `${userData.firstName} ${userData.lastName}`;

  const ResetPasswordEmailContent = ResetPasswordMailContent(name, link);

  const mailOptions = {
    from: ResetPasswordEmailContent.From,
    to: userData.email,
    subject: ResetPasswordEmailContent.Subject,
    html: ResetPasswordEmailContent.body,
  };
  gmailSmtpTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
      throw new Error(RESPONSE_ERROR_MESSAGES.AUTH.EMAIL_ERROR.RESET_PASSWORD);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

export const resetPasswordService = async (resetPasswordData) => {
  const { resetToken, newPassword } = resetPasswordData;
  const decodeToken = jwt.verify(
    resetToken,
    envIdentityConfig.RESET_PASSWORD_SECRET_JWT_KEY
  );

  if (!decodeToken) {
    return errorResponse(
      res,
      RESPONSE_STATUS_CODES.UNAUTHORIZED,
      RESPONSE_MESSAGES.UNAUTHORIZED
    );
  }

  const userData = await MasterUser.findOne({
    where: { email: decodeToken.email },
  });

  if (!userData) throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_NOT_FOUND);

  bcrypt.hash(newPassword, 10, async (err, hashedPassword) => {
    if (err) {
      throw new Error(RESPONSE_ERROR_MESSAGES.SERVER_ERROR);
    }

    await MasterUser.update(
      { password: hashedPassword },
      { where: { email: decodeToken.email } }
    );
  });
};
