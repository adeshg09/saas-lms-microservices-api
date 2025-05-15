import { identityDB } from "../config/db.config.js";
import { RESPONSE_ERROR_MESSAGES } from "../constants/index.js";

const { MasterUser, MasterUserProfile } = identityDB;
export const getProfileService = async (userId, organization) => {
  const user = await MasterUser.findOne({
    where: {
      id: userId,
      isDeleted: false,
    },
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "phone",
      "profilePhoto",
      "isActive",
      "createdBy",
      "createdDate",
    ],
    raw: true,
  });

  if (!user) {
    throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_NOT_FOUND);
  }

  if (organization) {
    // Todo
  } else {
    const profile = await MasterUserProfile.findOne({
      where: {
        userId: userId,
      },
      raw: true,
      attributes: ["id", "roleIds", "isHost"],
    });

    user.profile = profile;
    return { user: user };
  }
};
