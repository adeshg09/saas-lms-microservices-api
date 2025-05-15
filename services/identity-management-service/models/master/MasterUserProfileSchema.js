export default (sequelize, DataTypes) => {
  const MasterUserProfileSchema = sequelize.define(
    "masterUsersProfile",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "masterUsers",
          key: "id",
        },
        onDelete: "CASCADE",
        unique: true,
      },
      isHost: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      roleIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      createdBy: DataTypes.INTEGER,
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modifiedBy: DataTypes.INTEGER,
      modifiedDate: DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );

  // MasterUserProfileSchema.associate = (models) => {
  //   MasterUserProfileSchema.belongsTo(models.MasterUser, {
  //     foreignKey: "userId",
  //     as: "user",
  //   });
  //   MasterUserProfileSchema.belongsToMany(models.MasterRole, {
  //     through: "MasterUserProfileRoles",
  //     foreignKey: "profileId",
  //     otherKey: "roleId",
  //     as: "additionalRoles",
  //   });
  // };

  return MasterUserProfileSchema;
};
