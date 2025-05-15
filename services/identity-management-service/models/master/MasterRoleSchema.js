export default (sequelize, DataTypes) => {
  const MasterRoleSchema = sequelize.define(
    "masterRoles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Role name is required." },
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
      modifiedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      modifiedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  // MasterRoleSchema.associate = (models) => {
  //   MasterRoleSchema.belongsToMany(models.MasterPermission, {
  //     through: "masterRolePermissions",
  //     foreignKey: "roleId",
  //     otherKey: "permissionId",
  //     as: "permissions",
  //   });
  //   MasterRoleSchema.hasMany(models.MasterUser, {
  //     foreignKey: "roleId",
  //     as: "users",
  //   });
  // };

  return MasterRoleSchema;
};
