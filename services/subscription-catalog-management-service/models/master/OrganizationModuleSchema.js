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

  OrganizationModuleSchema.associate = (models) => {
    OrganizationModuleSchema.hasMany(models.OrganizationSubmodule, {
      foreignKey: "moduleId",
      as: "submodules",
    });
    OrganizationModuleSchema.belongsToMany(models.OrganizationSubmodule, {
      through: "organizationModulesSubmodules",
      foreignKey: "moduleId",
      otherKey: "subModuleId",
      as: "linkedSubmodules",
    });
  };

  return OrganizationModuleSchema;
};
