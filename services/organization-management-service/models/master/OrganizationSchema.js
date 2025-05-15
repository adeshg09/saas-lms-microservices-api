export default (sequelize, DataTypes) => {
  const OrganizationSchema = sequelize.define(
    "organizations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: DataTypes.STRING,
      logo: DataTypes.TEXT,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      pinCode: DataTypes.STRING,
      domain: DataTypes.STRING,
      registeredEmail: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      planId: {
        type: DataTypes.INTEGER,
        references: {
          model: "organizationPlans",
          key: "id",
        },
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      verificationStatus: {
        type: DataTypes.ENUM("PENDING", "VERIFIED", "REJECTED"),
        defaultValue: "PENDING",
      },
      //   verifiedBy: {
      //     type: DataTypes.INTEGER,
      //     references: {
      //       model: "masterUsers",
      //       key: "id",
      //     },
      //   },
      verifiedDate: DataTypes.DATE,
      verificationNotes: DataTypes.TEXT,
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

  OrganizationSchema.associate = (models) => {
    OrganizationSchema.belongsTo(models.OrganizationPlan, {
      foreignKey: "planId",
      as: "plan",
    });
    OrganizationSchema.hasMany(models.MasterUser, {
      foreignKey: "organizationId",
      as: "users",
    });
    OrganizationSchema.hasMany(models.OrganizationPlanSubscription, {
      foreignKey: "organizationId",
      as: "subscriptions",
    });
  };

  return OrganizationSchema;
};
