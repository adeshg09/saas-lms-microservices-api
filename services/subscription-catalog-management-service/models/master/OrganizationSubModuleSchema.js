export default (sequelize, DataTypes) => {
  const OrganizationSubmoduleSchema = sequelize.define(
    "organizationSubmodules",
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

  // OrganizationSubmoduleSchema.associate = (models) => {
  //   OrganizationSubmoduleSchema.belongsTo(models.OrganizationModule, {
  //     foreignKey: "moduleId",
  //     as: "parentModule",
  //   });
  //   OrganizationSubmoduleSchema.belongsToMany(models.OrganizationModule, {
  //     through: "organizationModulesSubmodules",
  //     foreignKey: "subModuleId",
  //     otherKey: "moduleId",
  //     as: "linkedModules",
  //   });
  // };

  return OrganizationSubmoduleSchema;
};
