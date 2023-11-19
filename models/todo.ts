"use strict";

import { DataTypes } from "sequelize";
import { sequelize } from "../src/db/connection.js";
import { user } from "./user.js";

const todo = sequelize.define("todos", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
    allowNull: false,
  },
});

todo.belongsTo(user, {
  foreignKey: "userid",
  as: "users", // this determines the name in `associations`!
});

export { todo };
