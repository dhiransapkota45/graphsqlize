"use strict";

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../src/db/connection.js";

// module.exports = () => {
class user extends Model {
  static associate(models) {
    // define association here
  }
}
user.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
export { user };
