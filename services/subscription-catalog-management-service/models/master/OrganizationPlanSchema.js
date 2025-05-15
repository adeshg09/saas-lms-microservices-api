export default (sequelize, DataTypes) => {
  const OrganizationPlanSchema = sequelize.define(
    "organizationPlans",
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
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      durationInMonths: DataTypes.INTEGER,
      moduleIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        validate: {
          notEmpty: {
            msg: "At least one module is required",
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      maxUsers: DataTypes.INTEGER,
      maxRoles: DataTypes.INTEGER,
      maxCourses: DataTypes.INTEGER,
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

  OrganizationPlanSchema.associate = (models) => {
    OrganizationPlanSchema.hasMany(models.Organization, {
      foreignKey: "planId",
      as: "organizations",
    });
    OrganizationPlanSchema.hasMany(models.OrganizationPlanSubscription, {
      foreignKey: "planId",
      as: "subscriptions",
    });
  };

  return OrganizationPlanSchema;
};
