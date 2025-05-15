export default (sequelize, DataTypes) => {
  const OrganizationModuleSubmoduleSchema = sequelize.define(
    "organizationModulesSubmodules",
    {
      moduleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "organizationModules",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      subModuleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "organizationSubmodules",
          key: "id",
        },
        onDelete: "CASCADE",
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

  return OrganizationModuleSubmoduleSchema;
};
