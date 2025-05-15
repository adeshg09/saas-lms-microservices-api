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
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      displayName: DataTypes.STRING,
      description: DataTypes.TEXT,
      icon: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modifiedBy: DataTypes.INTEGER,
      modifiedDate: DataTypes.DATE,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  OrganizationSubmoduleSchema.associate = (models) => {
    OrganizationSubmoduleSchema.belongsTo(models.OrganizationModule, {
      foreignKey: "moduleId",
      as: "parentModule",
    });
    OrganizationSubmoduleSchema.belongsToMany(models.OrganizationModule, {
      through: "organizationModulesSubmodules",
      foreignKey: "subModuleId",
      otherKey: "moduleId",
      as: "linkedModules",
    });
  };

  return OrganizationSubmoduleSchema;
};
