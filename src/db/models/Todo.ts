import { DataTypes } from "sequelize";

import { sequelize } from "../connection.js";
import { User } from "./User.js";

const Todo = sequelize.define("Todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "low",
  },
});

User.hasMany(Todo);
Todo.belongsTo(User);
