import { envIdentityConfig } from "../config/env.config.js";

export function ResetPasswordMailContent(Name, Link) {
  return {
    From: envIdentityConfig.HOST_EMAIL,
    Subject: "Reset Your Password",
    body:
      '<table style="padding: 5px;  width: 575px; margin: 0 auto; border-collapse: collapse; font-family: Verdana;font-size: 13px; color: #555;"><tbody>' +
      '<tr><td style="padding: 15px; text-align: center; color:#FFFFFF; background-color: #0A0A0A; height: 90px;font-size:24px;">AG Saas LMS</td></tr>' +
      '<tr><td style="padding: 30px 10px 10px;">Dear ' +
      Name +
      ",</td></tr>" +
      '<tr><td style="padding: 10px;">You are receiving this email because we received a password reset request for your account.</td></tr>' +
      '<tr><td style="padding: 30px 10px; text-align: center;">' +
      '<a href="' +
      Link +
      '" target="_blank" style="padding: 10px 30px; text-decoration:none; font-size:18px; font-weight:normal; color:#FFFFFF; background-color: #0A0A0A;">RESET PASSWORD</a></td></tr>' +
      '<tr><td style="padding: 10px;">If you did not request a password reset, no further action is required.</td></tr>' +
      '<tr><td style="padding: 20px 10px;">Regards,<br /><strong> The AG Sass LMS Team</strong></td></tr>' +
      '<tr><td style="padding: 10px 10px 5px; font-size:11px;">If you are having trouble clicking the "RESET PASSWORD" button, copy and paste the URL below into your web browser.<br /><a href="' +
      Link +
      '" target="_blank">' +
      Link +
      "</a></td></tr>" +
      '<tr><td style="padding: 15px; font-size:10px; text-align: center; color:#FFFFFF; background-color: #0A0A0A;">This is an auto-mailer. Please do not reply to this mail.</td></tr>' +
      "</tbody></table>",
  };
}
