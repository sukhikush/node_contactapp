"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class contactinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contactinfo.belongsTo(models.contact, {
        foreignKey: {
          allowNull: false,
          name: "conatctId",
        },
      });
    }
  }
  contactinfo.init(
    {
      conatctInfoType: DataTypes.STRING,
      conatctInfoData: DataTypes.STRING,
      conatctId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "contactinfo",
      underscored: true,
      paranoid: true,
      tableName: "contactinfos",
    }
  );
  return contactinfo;
};
