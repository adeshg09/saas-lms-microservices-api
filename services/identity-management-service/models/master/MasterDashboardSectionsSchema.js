export default (sequelize, DataTypes) => {
  const MasterDashboardSectionsSchema = sequelize.define(
    "masterDashboardSections",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sectionName: {
        type: DataTypes.STRING(70),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Section name is required." },
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      canRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      canCreate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      canUpdate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      canDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  // MasterPermissionSchema.associate = (models) => {
  //   MasterPermissionSchema.belongsToMany(models.MasterRole, {
  //     through: "masterRolePermissions",
  //     foreignKey: "permissionId",
  //     otherKey: "roleId",
  //     as: "roles",
  //   });
  // };

  return MasterDashboardSectionsSchema;
};
