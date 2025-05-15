export default (sequelize, DataTypes) => {
  const OrganizationPlanSubscriptionSchema = sequelize.define(
    "organizationPlanSubscriptions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organizationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "organizations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      planId: {
        type: DataTypes.INTEGER,
        references: {
          model: "organizationPlans",
          key: "id",
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfterStartDate(value) {
            if (value <= this.startDate) {
              throw new Error("End date must be after start date");
            }
          },
        },
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "EXPIRED", "CANCELLED"),
        defaultValue: "ACTIVE",
      },
      amountPaid: DataTypes.FLOAT,
      paymentRefId: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modifiedBy: DataTypes.INTEGER,
      modifiedDate: DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );

  OrganizationPlanSubscriptionSchema.associate = (models) => {
    OrganizationPlanSubscriptionSchema.belongsTo(models.Organization, {
      foreignKey: "organizationId",
      as: "organization",
    });
    OrganizationPlanSubscriptionSchema.belongsTo(models.Organization, {
      foreignKey: "planId",
      as: "plan",
    });
  };

  return OrganizationPlanSubscriptionSchema;
};
