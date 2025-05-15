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
        // references: {
        //   model: "organizations",
        //   key: "id",
        // },
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
      amountPaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentRefId: {
        type: DataTypes.STRING,
        allowNull: true,
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
    },
    {
      timestamps: false,
    }
  );

  // OrganizationPlanSubscriptionSchema.associate = (models) => {
  //   OrganizationPlanSubscriptionSchema.belongsTo(models.Organization, {
  //     foreignKey: "organizationId",
  //     as: "organization",
  //   });
  //   OrganizationPlanSubscriptionSchema.belongsTo(models.Organization, {
  //     foreignKey: "planId",
  //     as: "plan",
  //   });
  // };

  return OrganizationPlanSubscriptionSchema;
};
