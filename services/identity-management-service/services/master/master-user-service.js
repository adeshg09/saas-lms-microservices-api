import bcrypt from "bcryptjs";
import { identityDB } from "../../config/db.config.js";
import { RESPONSE_ERROR_MESSAGES } from "../../constants/index.js";
const { MasterUser, MasterUserProfile, MasterRole } = identityDB;

export const registerUserService = async (registerData) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    isActive,
    createdBy,
    roleIds,
  } = registerData;

  const userData = await MasterUser.findOne({ where: { email } });
  if (userData)
    throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_ALREADY_EXISTS);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await MasterUser.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    phone: phone || null,
    isActive: isActive === "true" ? true : false,
    createdBy: createdBy,
  });

  console.log("newUser", newUser);

  await MasterUserProfile.create({
    userId: newUser.id,
    isHost: false,
    roleIds: JSON.parse(roleIds),
    createdBy: createdBy,
  });

  return { newUser };
};

export const updateUserService = async (params, body) => {
  const { id } = params;
  const { firstName, lastName, email, phone, isActive, roleIds, modifiedBy } =
    body;

  const userExists = await MasterUser.findOne({ where: { email } });
  if (userExists && userExists.id !== parseInt(id)) {
    throw new Error(RESPONSE_ERROR_MESSAGES.AUTH.EMAIL_ERROR.ALREADY_IN_USE);
  }

  await MasterUser.update(
    {
      firstName,
      lastName,
      email,
      phone,
      isActive: isActive === "true" ? true : false,
      modifiedBy,
      modifiedDate: new Date(),
    },
    {
      where: { id },
    }
  );

  const updatedUser = await MasterUser.findOne({ where: { id } });

  const profile = await MasterUserProfile.findOne({ where: { userId: id } });
  if (profile) {
    await profile.update({
      roleIds: roleIds ? JSON.parse(roleIds) : [],
      modifiedBy: modifiedBy || profile.modifiedBy,
      modifiedDate: new Date(),
    });
  }

  return { updatedUser };
};

export const deleteUserService = async (params, body) => {
  const { id } = params;
  const { modifiedBy } = body;

  const userExists = await MasterUser.findOne({ where: { id } });
  if (!userExists) {
    throw new Error(RESPONSE_ERROR_MESSAGES.USER.USER_NOT_FOUND);
  }

  //Update the user to perform soft delete
  const updatedUser = await MasterUser.update(
    {
      email: `${userExists.email}_arc_${new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(0, 14)}`, // Appending timestamp to email
      isDeleted: true,
      modifiedBy: modifiedBy || userExists.modifiedBy, // Update modifiedBy if provided
      modifiedDate: new Date(), // Set current timestamp
    },
    {
      where: { id },
      validate: false,
    }
  );

  return updatedUser;
};

export const getUserByIdService = async (params) => {
  const { id } = params;

  const user = await MasterUser.findOne({
    where: {
      id,
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

  // Get the user's profile
  const profile = await MasterUserProfile.findOne({
    where: {
      userId: id,
    },
    attributes: ["roleIds"],
    raw: true,
  });

  // Fetch roles if any
  let roles = [];
  if (profile?.roleIds?.length > 0) {
    roles = await MasterRole.findAll({
      where: {
        id: profile.roleIds,
      },
      attributes: ["id", "name"],
      raw: true,
    });
  }

  return {
    user: {
      ...user,
      roles,
    },
  };
};

export const getAllUsersService = async () => {
  const allUsers = await MasterUser.findAll({
    where: {
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

  const allProfiles = await MasterUserProfile.findAll({ raw: true });

  const allRoles = await MasterRole.findAll({ raw: true });

  const result = allUsers.map((user) => {
    const profile = allProfiles.find((p) => p.userId === user.id);
    const roleIds = profile?.roleIds || [];

    const userRoles = allRoles.filter((role) => roleIds.includes(role.id));
    const mappedRoles = userRoles.map((r) => ({ id: r.id, name: r.name }));

    return {
      ...user,
      roles: mappedRoles,
    };
  });

  return { users: result };
};
