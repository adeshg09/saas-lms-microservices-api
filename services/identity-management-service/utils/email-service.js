import { envIdentityConfig } from "../config/env.config.js";
import nodemailer from "nodemailer";

export const gmailSmtpTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envIdentityConfig.HOST_EMAIL,
    pass: envIdentityConfig.GMAIL_SMTP_APP_PASSWORD,
  },
});
