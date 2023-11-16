import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const User = sequelize.define("User", {
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
});
