import { DataTypes } from "sequelize";

import { sequelize } from "../connection.js";
import { User } from "./User.js";

export const Todo = sequelize.define("todo", {
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
    defaultValue: "high",
  },
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: "user",
        schema: "public",
      },
    },
    key: "id",
  },
});

User.hasMany(Todo);
Todo.belongsTo(User);
