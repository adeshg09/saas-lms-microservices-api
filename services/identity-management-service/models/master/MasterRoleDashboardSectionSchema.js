export default (sequelize, DataTypes) => {
  const MasterRoleDashboardSectionSchema = sequelize.define(
    "masterRoleDashboardSection",
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "masterRoles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      dashboardSectionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "masterDashboardSections",
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

  return MasterRoleDashboardSectionSchema;
};
