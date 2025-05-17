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
        type: DataTypes.STRING(70),
        unique: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING(50),
        trim: true,
      },
      description: {
        type: DataTypes.STRING(50),
        trim: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      durationInMonths: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "FREE",
      },
      moduleIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        validate: {
          notEmpty: {
            msg: "At least one module is required",
          },
        },
      },
      maxUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20,
      },
      maxRoles: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      maxCourses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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

  // OrganizationPlanSchema.associate = (models) => {
  //   OrganizationPlanSchema.hasMany(models.Organization, {
  //     foreignKey: "planId",
  //     as: "organizations",
  //   });
  //   OrganizationPlanSchema.hasMany(models.OrganizationPlanSubscription, {
  //     foreignKey: "planId",
  //     as: "subscriptions",
  //   });
  // };

  return OrganizationPlanSchema;
};
