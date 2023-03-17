"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.contact, {
        foreignKey: {
          allowNull: false,
          name: "userId",
        },
      });
    }
  }
  user.init(
    {
      userName: DataTypes.STRING,
      userPass: DataTypes.STRING,
      userEmail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
      paranoid: true,
      tableName: "users",
    }
  );
  return user;
};
