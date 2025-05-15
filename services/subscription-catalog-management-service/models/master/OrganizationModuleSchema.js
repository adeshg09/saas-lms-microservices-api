export default (sequelize, DataTypes) => {
  const OrganizationModuleSchema = sequelize.define(
    "organizationModules",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(70),
        trim: true,
        unique: true,
        allowNull: false,
        required: [true, "Name is required."],
      },
      displayName: {
        type: DataTypes.STRING(50),
        trim: true,
      },
      description: {
        type: DataTypes.STRING(500),
        trim: true,
      },
      icon: {
        type: DataTypes.TEXT,
        trim: true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modifiedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      modifiedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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

  // OrganizationModuleSchema.associate = (models) => {
  //   OrganizationModuleSchema.hasMany(models.OrganizationSubmodule, {
  //     foreignKey: "moduleId",
  //     as: "submodules",
  //   });
  //   OrganizationModuleSchema.belongsToMany(models.OrganizationSubmodule, {
  //     through: "organizationModulesSubmodules",
  //     foreignKey: "moduleId",
  //     otherKey: "subModuleId",
  //     as: "linkedSubmodules",
  //   });
  // };

  return OrganizationModuleSchema;
};
