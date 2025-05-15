export default (sequelize, DataTypes) => {
  const MasterUserSchema = sequelize.define(
    "masterUsers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        trim: true,
        allowNull: false,
        validate: {
          notEmpty: { msg: "First name is required." },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        trim: true,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Last name is required." },
        },
      },
      email: {
        type: DataTypes.STRING(120),
        trim: true,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: { msg: "Email is required." },
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required." },
        },
      },
      phone: {
        type: DataTypes.STRING(15),
        trim: true,
      },
      profilePhoto: {
        type: DataTypes.TEXT,
      },
      organizationId: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: "organizations",
        //   key: "id",
        // },
        onDelete: "CASCADE",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

  // MasterUserSchema.associate = (models) => {
  //   MasterUserSchema.belongsTo(models.MasterRole, {
  //     foreignKey: "roleId",
  //     as: "role",
  //   });
  //   MasterUserSchema.belongsTo(models.Organization, {
  //     foreignKey: "organizationId",
  //     as: "organization",
  //   });
  //   MasterUserSchema.hasOne(models.MasterUserProfile, {
  //     foreignKey: "userId",
  //     as: "profile",
  //   });
  // };

  return MasterUserSchema;
};
